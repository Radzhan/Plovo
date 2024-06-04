import { CartDish } from '../../types';
import './Receipt.css'

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
      <h2>Дон Кебаб</h2>
      <p>Номер чека: {checkNumber}</p>
      <p>Дата: {currentDate}</p>
      <ul>
        {cartDishes.map((dish) => (
          <li key={dish.dish.id}>
            {dish.dish.name} x {dish.amount} - {dish.dish.price * dish.amount} руб.
          </li>
        ))}
      </ul>
      <p>Сумма: {totalAmount} руб.</p>
      <b>Оплата:</b>
      <span>{payMode}</span>
      <span>{totalAmount} руб.</span>
    </div>
  );
};

export default Receipt;
