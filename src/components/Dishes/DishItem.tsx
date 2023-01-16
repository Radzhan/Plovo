import React from 'react';
import {Dish} from "../../types";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {addDish} from "../../store/cartSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  dish: Dish;
  onDelete: React.MouseEventHandler;
  deleteLoading: false | string;
}

const DishItem: React.FC<Props> = ({dish, onDelete, deleteLoading}) => {
  const dispatch = useAppDispatch();
  const imageUrl = 'https://cdn.momsdish.com/wp-content/uploads/2021/06/Uzbek-Plov-Recipe-05-600x900.jpg';
  const image = dish.image || imageUrl;
  const imageStyle = {
    background: `url(${image}) no-repeat center center / cover`
  };

  const addToCart = () => {
    dispatch(addDish(dish));
  };

  return (
    <div className="card mb-2">
      <div className="row no-gutters">
        <div className="col-sm-4 rounded-start" style={imageStyle}/>
        <div className="col-sm-8">
          <div className="card-body">
            <h5 className="card-title">{dish.name}</h5>
            <p className="card-text small">{dish.description}</p>
            <p className="card-text">{dish.price} KGS</p>
            <p className="d-flex gap-2">
              <button className="btn btn-success" onClick={addToCart}>Add</button>
              <Link className="btn btn-primary" to={`/edit-dish/${dish.id}`}>Edit</Link>
              <button
                className="btn btn-danger"
                onClick={onDelete}
                disabled={deleteLoading ? deleteLoading === dish.id : false}
              >
                {deleteLoading && deleteLoading === dish.id && <ButtonSpinner/>}
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DishItem;