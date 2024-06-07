import React from "react";
import { Dish } from "../../types";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addDish } from "../../store/cartSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import styles from "./Dishesitem.module.css";

interface Props {
  dish: Dish;
  onDelete: React.MouseEventHandler;
  deleteLoading: false | string;
}

const DishItem: React.FC<Props> = ({ dish, onDelete, deleteLoading }) => {
  const dispatch = useAppDispatch();
  const imageUrl =
    "https://cdn.momsdish.com/wp-content/uploads/2021/06/Uzbek-Plov-Recipe-05-600x900.jpg";
  const image = dish.image || imageUrl;

  const addToCart = () => {
    dispatch(addDish(dish));
  };

  return (
    <div className={styles.card}>
      <img src={image} alt="dish" />
      <h5 className={styles.cardTitle}>{dish.name}</h5>
      <p>{dish.price} сом</p>
      <div className={styles.cardBtnGroup}>
        <button className={styles.btnAdd} onClick={addToCart}>
          <IoMdAdd />
        </button>
        <button className={styles.btnEdit}>
          <Link to={`/edit-dish/${dish.id}`}>
            <MdEdit />
          </Link>
        </button>
        <button
          className={styles.btnDelete}
          onClick={onDelete}
          disabled={deleteLoading ? deleteLoading === dish.id : false}
        >
          {deleteLoading && deleteLoading === dish.id && (
            <div className={styles.buttonSpinner}>
              <ButtonSpinner />
            </div>
          )}
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default DishItem;
