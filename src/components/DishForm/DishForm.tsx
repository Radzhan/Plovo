import React, { useState } from "react";
import { ApiDish, DishMutation } from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  onSubmit: (dish: ApiDish) => void;
  existingDish?: DishMutation;
  isEdit?: boolean;
  isLoading?: boolean;
}

const initialState: DishMutation = {
  name: "",
  description: "",
  image: "",
  price: "",
};

const DishForm: React.FC<Props> = ({
  onSubmit,
  existingDish = initialState,
  isEdit = false,
  isLoading = false,
}) => {
  const [dish, setDish] = useState<DishMutation>(existingDish);

  const onDishChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setDish((prev) => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...dish,
      price: parseFloat(dish.price),
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{isEdit ? "Edit dish" : "Add new dish"}</h4>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          value={dish.name}
          onChange={onDishChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          value={dish.description}
          onChange={onDishChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          id="image"
          name="image"
          type="url"
          className="form-control"
          value={dish.image}
          onChange={onDishChange}
        />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          className="form-control"
          value={dish.price}
          onChange={onDishChange}
        />
      </div>
      <button type="submit" disabled={isLoading} className="btn btn-primary">
        {isLoading && <ButtonSpinner />}
        {isEdit ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default DishForm;
