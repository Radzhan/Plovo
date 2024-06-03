import {CartDish, CartToApi, Dish} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

interface CartState {
  cartDishes: CartToApi;
}

const initialState: CartState = {
  cartDishes: {
    CartDish: [],
    payMode: 'Картой'
  },
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, {payload: dish}: PayloadAction<Dish>) => {
      const existingIndex = state.cartDishes.CartDish.findIndex(item => {
        return item.dish.id === dish.id;
      });

      if (existingIndex !== -1) {
        state.cartDishes.CartDish[existingIndex].amount++;
      } else {
        state.cartDishes.CartDish.push({dish, amount: 1});
      }
    },
    minusDish: (state, {payload: dish} : PayloadAction<Dish>) => {
      const existingIndex = state.cartDishes.CartDish.findIndex(item => {
        return item.dish.id === dish.id;
      });

      if (state.cartDishes.CartDish[existingIndex].amount > 1) {
        state.cartDishes.CartDish[existingIndex].amount--;
      } else if (state.cartDishes.CartDish[existingIndex].amount <= 1) {
        state.cartDishes.CartDish.splice(existingIndex, 1)
      }
    },
    resetCart: (state) => {
      state.cartDishes.CartDish = [];
    },
    updateDishes: (state, {payload: dishes}: PayloadAction<Dish[]>) => {
      const newCartDishes: CartDish[] = [];

      state.cartDishes.CartDish.forEach(cartDish => {
        const existingDish = dishes.find(dish => dish.id === cartDish.dish.id);

        if (!existingDish) {
          return;
        }

        newCartDishes.push({
          ...cartDish,
          dish: existingDish,
        });
      });

      state.cartDishes.CartDish = newCartDishes;
    }
  }
});

export const cartReducer = cartSlice.reducer;

export const {addDish, resetCart, updateDishes, minusDish} = cartSlice.actions;

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;