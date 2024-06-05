import React, { useCallback, useEffect, useState } from 'react';
import { ApiOrdersList, Order } from "../../types";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse, format } from 'date-fns';
import { ru } from 'date-fns/locale';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [stats, setStats] = useState({ total: 0, cash: 0, card: 0 });

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const ordersResponse = await axiosApi.get<ApiOrdersList | null>('/orders.json');
      const orders = ordersResponse.data;

      if (!orders) {
        return setOrders([]);
      }

      const newOrders = Object.keys(orders).map(id => {
        const order = orders[id];

        const totalPrice = order.dishes.reduce((acc, cartDish) => {
          return acc + (cartDish.dish.price * cartDish.amount);
        }, 0);

        return {
          ...order,
          totalPrice,
          id,
          date: parse(order.date, 'dd.MM.yyyy, HH:mm:ss', new Date(), { locale: ru })
        };
      });

      setOrders(newOrders);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  const calculateStats = useCallback(() => {
    let total = 0;
    let cash = 0;
    let card = 0;

    const filteredOrders = orders.filter(order => {
      return (
        (!startDate || order.date >= startDate) &&
        (!endDate || order.date <= endDate)
      );
    });

    filteredOrders.forEach(order => {
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
        <h4>Заказы</h4>
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
        {loading ? <Spinner /> : (
          <>
            <div className="mb-3">
              <h5>Статистика</h5>
              <p>Продаж на сумму: <strong>{stats.total} KGS</strong></p>
              <p>Наличными: <strong>{stats.cash} KGS</strong></p>
              <p>Картой: <strong>{stats.card} KGS</strong></p>
            </div>
            {orders.map(order => (
              <div key={order.id} className="card mb-2">
                <div className="card-body">
                  <span> ordered on {format(order.date, 'dd.MM.yyyy, HH:mm:ss')} for a total price of </span>
                  <strong>{order.totalPrice} KGS</strong>
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
