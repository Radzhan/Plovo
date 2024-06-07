import React, { useEffect } from "react";
import DishItem from "./DishItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectDishDeleteLoading,
  selectDishes,
  selectDishesFetchLoading,
} from "../../store/dishesSlice";
import { deleteDish, fetchDishes } from "../../store/dishesThunks";
import Spinner from "../Spinner/Spinner";
import styles from './Dishes.module.css';

const Dishes: React.FC = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const fetchLoading = useAppSelector(selectDishesFetchLoading);
  const deleteLoading = useAppSelector(selectDishDeleteLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const removeDish = async (id: string) => {
    if (window.confirm("Do you really want to delete this dish?")) {
      await dispatch(deleteDish(id));
      await dispatch(fetchDishes());
    }
  };

  return (
    <>
      <h4>Все товары</h4>
      <div className={styles.boxMain}>
        {fetchLoading ? (
          <Spinner />
        ) : (
          dishes.map((dish) => (
            <DishItem
              key={dish.id}
              dish={dish}
              onDelete={() => removeDish(dish.id)}
              deleteLoading={deleteLoading}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Dishes;
