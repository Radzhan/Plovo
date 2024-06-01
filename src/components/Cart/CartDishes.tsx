import React, { forwardRef } from 'react';
import CartItem from "./CartItem";
import { CartDish } from "../../types";

interface Props {
  cartDishes: CartDish[];
}

const CartDishes = forwardRef<HTMLDivElement, Props>(({ cartDishes }, ref) => {
  const total = cartDishes.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.dish.price;
  }, 0);

  return (
    <div className="ticket" ref={ref}>
      {cartDishes.map(cartDish => (
        <CartItem key={cartDish.dish.id} cartDish={cartDish} />
      ))}
      <div className="card border-0 p-2">
        <div className="row">
          <div className="col text-right">
            Total:
          </div>
          <div className="col-3 text-right">
            <strong>{total}</strong> KGS
          </div>
        </div>
      </div>
    </div>
  );
});

export default CartDishes;
