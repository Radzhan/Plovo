import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Modal from "../Modal/Modal";
import CartDishes from "./CartDishes";
import {useAppSelector} from "../../app/hooks";
import {selectCartDishes} from "../../store/cartSlice";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const cartDishes = useAppSelector(selectCartDishes);
  const [showModal, setShowModal] = useState(false);

  let cart = (
    <div className="alert alert-primary">
      Корзина пуста ! Добавьте что-то !
    </div>
  );
  const cancel = () => setShowModal(prev => !prev);

  if (cartDishes.CartDish.length > 0) {
    cart = (
      <>
        <CartDishes cartDishes={cartDishes.CartDish}/>
        <button
          className="w-100 btn btn-primary"
          onClick={cancel}
        >
          Оплатить
        </button>
      </>
    );
  }

  return (
    <>
      <h4>Чек</h4>
      {cart}
      <Modal show={showModal} title="Заказ" onClose={cancel}>
        <div className="modal-body">
          <p>Перейти на страницу заказа ?</p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-danger"
            onClick={cancel}
          >
            Отмена
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/checkout')}
          >
            Продолжить
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Cart;