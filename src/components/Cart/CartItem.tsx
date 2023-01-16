import React from 'react';
import {CartDish} from "../../types";

interface Props {
  cartDish: CartDish;
}

const CartItem: React.FC<Props> = ({cartDish}) => {
  const price = cartDish.amount * cartDish.dish.price;

  return (
    <div className="card mb-2 p-2">
      <div className="row align-items-center">
        <div className="col">{cartDish.dish.name}</div>
        <div className="col-2">x{cartDish.amount}</div>
        <div className="col-3 text-right">
          {price} KGS
        </div>
      </div>
    </div>
  );
};

export default CartItem;