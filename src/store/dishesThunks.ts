import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiDish, ApiDishesList, Dish} from "../types";
import axiosApi from "../axiosApi";
import {AppDispatch} from "../app/store";
import {updateDishes} from "./cartSlice";

export const fetchDishes = createAsyncThunk<Dish[], undefined, {dispatch: AppDispatch}>(
  'dishes/fetchAll',
  async (_, thunkAPI) => {
    const dishesResponse = await axiosApi.get<ApiDishesList | null>('/dishes.json');
    const dishes = dishesResponse.data;

    let newDishes: Dish[] = [];

    if (dishes) {
      newDishes = Object.keys(dishes).map(id => {
        const dish = dishes[id];
        return {
          ...dish,
          id
        }
      });
    }

    thunkAPI.dispatch(updateDishes(newDishes));

    return newDishes;
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  'dishes/delete',
  async (dishId) => {
    await axiosApi.delete('/dishes/' + dishId + '.json');
  }
);

export const createDish = createAsyncThunk<void, ApiDish>(
  'dishes/create',
  async (apiDish) => {
    await axiosApi.post('/dishes.json', apiDish);
  }
);

export const fetchDish = createAsyncThunk<ApiDish, string>(
  'dishes/fetchOne',
  async (id) => {
    const response = await axiosApi.get<ApiDish | null>('/dishes/' + id + '.json');
    const dish = response.data;

    if (dish === null) {
      throw new Error('Not Found!');
    }

    return dish;
  }
);

interface UpdateDishParams {
  id: string;
  dish: ApiDish;
}

export const updateDish = createAsyncThunk<void, UpdateDishParams>(
  'dishes/update',
  async (params) => {
    await axiosApi.put('/dishes/' + params.id + '.json', params.dish);
  }
);
