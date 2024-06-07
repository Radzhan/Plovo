export interface Dish {
  id: string;
  name: string;
  image: string;
  price: number;
}

export type ApiDish = Omit<Dish, "id">;

export interface ApiDishesList {
  [id: string]: ApiDish;
}

export interface DishMutation {
  name: string;
  image: string;
  price: string;
}

export interface CartToApi {
  payMode: "Картой" | "Наличными";
  CartDish: CartDish[];
  date: string;
}

export interface CartDish {
  dish: Dish;
  amount: number;
}

export interface ApiOrder {
  dishes: CartDish[];
  payMode: "Картой" | "Наличными";
  date: string;
}

export interface ApiOrdersList {
  [id: string]: ApiOrder;
}

export interface Order {
  id: string;
  totalPrice: number;
  dishes: CartDish[];
  payMode: "Картой" | "Наличными";
  date: Date; // Меняем тип на Date
}
