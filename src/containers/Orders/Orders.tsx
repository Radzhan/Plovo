import React, {useCallback, useEffect, useState} from 'react';
import {ApiOrdersList, Order} from "../../types";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);


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


  return (
    <div className="row mt-2">
      <div className="col">
        <h4>Orders</h4>
        {loading ? <Spinner/> : (
          <>
            {orders.map(order => (
              <div key={order.id} className="card mb-2">
                <div className="card-body">
                  <span> ordered for a total price of </span>
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