import React, {useState} from 'react';
import {ApiOrder, Customer} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {resetCart, selectCartDishes} from "../../store/cartSlice";

const CustomerForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    address: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const cartDishes = useAppSelector(selectCartDishes);

  const customerChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setCustomer(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const order: ApiOrder = {
      customer,
      dishes: cartDishes,
    };

    try {
      await axiosApi.post('/orders.json', order);
      dispatch(resetCart());
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  let form = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="name">Client name</label>
        <input
          id="name" type="text" name="name"
          className="form-control"
          value={customer.name}
          onChange={customerChanged}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          id="address" type="text" name="address"
          className="form-control"
          value={customer.address}
          onChange={customerChanged}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone" type="text" name="phone"
          className="form-control"
          value={customer.phone}
          onChange={customerChanged}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Place order
      </button>
    </form>
  );

  if (loading) {
    form = <Spinner/>;
  }

  return (
    <div className="row mt-2">
      <div className="col">
        <h4>Customer data</h4>
        {form}
      </div>
    </div>
  );
};

export default CustomerForm;