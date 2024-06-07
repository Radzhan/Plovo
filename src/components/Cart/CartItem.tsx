import React from "react";
import { CartDish } from "../../types";
import { useAppDispatch } from "../../app/hooks";
import { minusDish } from "../../store/cartSlice";
import { useLocation } from "react-router-dom";
import styles from "./CartItem.module.css";
interface Props {
  cartDish: CartDish;
}

const CartItem: React.FC<Props> = ({ cartDish }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isCheckoutPage =
    location.pathname === "/checkout" ||
    location.pathname === "/checkout/continue";

  const price = cartDish.amount * cartDish.dish.price;

  const removeFromCard = async () => {
    await dispatch(minusDish(cartDish.dish));
  };

  return (
    <div className={styles.dishesBlock}>
      <p className={styles.dishName}>{cartDish.dish.name}</p>
      <p className={styles.dishesAmount}>x{cartDish.amount}</p>
      <div className={styles.priceBlock}>
        <p>{price} сом</p>
        {isCheckoutPage ? null : (
          <button
            className=""
            onClick={removeFromCard}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
