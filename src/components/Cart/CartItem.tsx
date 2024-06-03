import React from "react";
import { CartDish } from "../../types";
import { useAppDispatch } from "../../app/hooks";
import { minusDish } from "../../store/cartSlice";
import { useLocation } from "react-router-dom";
interface Props {
  cartDish: CartDish;
}

const CartItem: React.FC<Props> = ({ cartDish }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isCheckoutPage = location.pathname === "/checkout" || location.pathname === '/checkout/continue';

  const price = cartDish.amount * cartDish.dish.price;

  const removeFromCard = async () => {
    await dispatch(minusDish(cartDish.dish));
  };

  return (
    <div className="card mb-2 p-2">
      <div className="row align-items-center">
        <div className="col">{cartDish.dish.name}</div>
        <div className="col-2">x{cartDish.amount}</div>
        <div className="col-2 text-right">
          {price} KGS
          {isCheckoutPage ? null : (
            <button className="mx-3 btn btn-danger" style={{padding: '0 5px'}} onClick={removeFromCard}>
              X
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
