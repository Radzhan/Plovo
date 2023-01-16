import React from 'react';
import CartDishes from "../../components/Cart/CartDishes";
import {Link, Navigate, NavLink, Outlet} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectCartDishes} from "../../store/cartSlice";

const Checkout: React.FC = () => {
  const cartDishes = useAppSelector(selectCartDishes);

  if (cartDishes.length === 0) {
    return <Navigate to="/"/>;
  }

  return (
    <div className="row mt-2">
      <div className="col-4 m-auto">
        <h4>Checkout</h4>
        <CartDishes cartDishes={cartDishes}/>
        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-danger">Cancel</Link>
          <NavLink to="continue" className="btn btn-primary">Continue</NavLink>
        </div>
        <Outlet/>
      </div>
    </div>
  );
};

export default Checkout;