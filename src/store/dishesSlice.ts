import {ApiDish, ApiOrdersList, Dish} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createDish, deleteDish, fetchDish, fetchDishes, fetchOrders, updateDish} from "./dishesThunks";
import {RootState} from "../app/store";

interface DishesState {
  items: Dish[];
  fetchLoading: boolean;
  deleteLoading: false | string;
  createLoading: boolean;
  updateLoading: boolean;
  fetchOneLoading: boolean;
  oneDish: null | ApiDish;
  orders: ApiOrdersList;
}

const initialState: DishesState = {
  items: [],
  fetchLoading: false,
  deleteLoading: false,
  createLoading: false,
  updateLoading: false,
  fetchOneLoading: false,
  oneDish: null,
  orders: {}
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchDishes.fulfilled, (state, {payload: dishes}) => {
      state.fetchLoading = false;
      state.items = dishes;
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      state.orders = payload;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchDishes.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(deleteDish.pending, (state, {meta: {arg: dishId}}) => {
      state.deleteLoading = dishId;
    });
    builder.addCase(deleteDish.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteDish.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(createDish.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createDish.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createDish.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(updateDish.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateDish.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateDish.rejected, (state) => {
      state.updateLoading = false;
    });

    builder.addCase(fetchDish.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchDish.fulfilled, (state, {payload: dish}) => {
      state.fetchOneLoading = false;
      state.oneDish = dish;
    });
    builder.addCase(fetchDish.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  }
});

export const dishesReducer = dishesSlice.reducer;

export const selectDishes = (state: RootState) => state.dishes.items;
export const selectOrders = (state: RootState) => state.dishes.orders;
export const selectDishesFetchLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectDishDeleteLoading = (state: RootState) => state.dishes.deleteLoading;
export const selectDishCreateLoading = (state: RootState) => state.dishes.createLoading;
export const selectDishUpdateLoading = (state: RootState) => state.dishes.updateLoading;
export const selectOneDishFetchLoading = (state: RootState) => state.dishes.fetchOneLoading;
export const selectOneDish = (state: RootState) => state.dishes.oneDish;