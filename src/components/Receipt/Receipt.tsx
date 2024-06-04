import { CartDish } from "../../types";
import "./Receipt.css";

interface ReceiptProps {
  checkNumber: number;
  payMode: "Картой" | "Наличными";
  cartDishes: CartDish[];
}

const Receipt: React.FC<ReceiptProps> = ({
  checkNumber,
  payMode,
  cartDishes,
}) => {
  const currentDate = new Date().toLocaleString();
  const totalAmount = cartDishes.reduce(
    (total, dish) => total + dish.dish.price * dish.amount,
    0
  );

  return (
    <div className="receipt">
      <h2 className="mb-2">Дон Кебаб</h2>
      <p className="info-check">Номер чека: {checkNumber}</p>
      <p className="info-check">Дата: {currentDate}</p>
      <ul>
        {cartDishes.map((dish) => (
          <li key={dish.dish.id}>
            <span>{dish.dish.name}</span>{" "}
            <div className="price-receipt">
              <p className="amount">x {dish.amount}</p>
              <p>- {dish.dish.price * dish.amount} сом.</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="sum">
        <span>Сумма:</span> <b>{totalAmount} сом.</b> 
      </p>
      <b>Оплата:</b>
      <div className="payM">
        <span>{payMode}</span>
        <span>{totalAmount} сом.</span>
      </div>
    </div>
  );
};

export default Receipt;
