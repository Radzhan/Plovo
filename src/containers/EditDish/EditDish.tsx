import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {ApiDish} from "../../types";
import DishForm from "../../components/DishForm/DishForm";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDishUpdateLoading, selectOneDish, selectOneDishFetchLoading} from "../../store/dishesSlice";
import {fetchDish, updateDish} from "../../store/dishesThunks";
import Spinner from "../../components/Spinner/Spinner";

const EditDish = () => {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const updateLoading = useAppSelector(selectDishUpdateLoading);
  const fetchOneLoading = useAppSelector(selectOneDishFetchLoading);
  const dish = useAppSelector(selectOneDish);

  useEffect(() => {
    dispatch(fetchDish(id));
  }, [dispatch, id]);

  const onSubmit = async (dish: ApiDish) => {
    await dispatch(updateDish({id, dish}));
    navigate('/');
  };

  const existingDish = dish && {
    ...dish,
    price: dish.price.toString(),
  };

  return (
    <div className="row mt-2">
      <div className="col">
        {fetchOneLoading && <Spinner/>}
        {existingDish && (
          <DishForm
            onSubmit={onSubmit}
            existingDish={existingDish}
            isEdit
            isLoading={updateLoading}
          />
        )}
      </div>
    </div>
  );
};

export default EditDish;