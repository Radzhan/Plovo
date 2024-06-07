import React, { useCallback, useEffect, useState } from "react";
import { Order } from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, format } from "date-fns";
import { ru } from "date-fns/locale";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteOrder, fetchOrders } from "../../store/dishesThunks";
import { selectOrders } from "../../store/dishesSlice";
import styles from "./Orders.module.css";
import { MdDelete } from "react-icons/md";

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const ordersFetch = useAppSelector(selectOrders);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [stats, setStats] = useState({ total: 0, cash: 0, card: 0 });

  const removeOrder = async (id: string) => {
    if (window.confirm("Do you really want to delete this order?")) {
      await dispatch(deleteOrder(id));
      await dispatch(fetchOrders());
    }
  };

  const fetchOrdersFunc = useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(fetchOrders());
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    void fetchOrdersFunc();
  }, [fetchOrdersFunc]);

  useEffect(() => {
    if (ordersFetch) {
      const newOrders = Object.keys(ordersFetch).map((id) => {
        const order = ordersFetch[id];
        const totalPrice = order.dishes.reduce((acc, cartDish) => {
          return acc + cartDish.dish.price * cartDish.amount;
        }, 0);

        return {
          ...order,
          totalPrice,
          id,
          date: parse(order.date, "dd.MM.yyyy, HH:mm:ss", new Date(), {
            locale: ru,
          }),
        };
      });

      setOrders(newOrders);
    }
  }, [ordersFetch]);

  const calculateStats = useCallback(() => {
    let total = 0;
    let cash = 0;
    let card = 0;

    const filteredOrders = orders.filter((order) => {
      return (
        (!startDate || order.date >= startDate) &&
        (!endDate || order.date <= endDate)
      );
    });

    filteredOrders.forEach((order) => {
      total += order.totalPrice;
      if (order.payMode === "Наличными") {
        cash += order.totalPrice;
      } else if (order.payMode === "Картой") {
        card += order.totalPrice;
      }
    });

    setStats({ total, cash, card });
  }, [orders, startDate, endDate]);

  useEffect(() => {
    calculateStats();
  }, [orders, startDate, endDate, calculateStats]);

  return (
    <div className="row mt-2">
      <div className="col">
        <h4>Период</h4>
        <div className="d-flex mb-3">
          <div className="mr-3">
            <label>Начальная дата:</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              isClearable
            />
          </div>
          <div>
            <label>Конечная дата:</label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              isClearable
            />
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="mb-3">
              <h5>Статистика</h5>
              <p>
                Продаж на сумму: <strong>{stats.total} KGS</strong>
              </p>
              <p>
                Наличными: <strong>{stats.cash} KGS</strong>
              </p>
              <p>
                Картой: <strong>{stats.card} KGS</strong>
              </p>
            </div>
            {orders.map((order, index) => (
              <div key={order.id} className="card mb-2">
                <div className="card-body">
                  <span>
                    {index + 1} Заказано в{" "}
                    {format(order.date, "dd.MM.yyyy, HH:mm:ss")} на общую сумму{" "}
                  </span>
                  <strong>{order.totalPrice} KGS</strong>
                  <button
                    className={styles.btnDelete}
                    onClick={() => removeOrder(order.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
