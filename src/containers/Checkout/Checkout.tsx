import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetCart, selectCartDishes } from "../../store/cartSlice";
import { ApiOrder } from "../../types";
import axiosApi from "../../axiosApi";
import CartDishes from "../../components/Cart/CartDishes";
import Spinner from "../../components/Spinner/Spinner";
import useSyncOfflineRequests from "../../app/hooks/useSyncOfflineRequest";
import { saveRequest } from "../../app/utils/localStorageUtil";
import { useReactToPrint } from "react-to-print";
import Receipt from "../../components/Receipt/Receipt";

const Checkout: React.FC = () => {
  useSyncOfflineRequests();
  const printRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartDishes = useAppSelector(selectCartDishes);
  const [loading, setLoading] = useState(false);
  const [payM, setPayM] = useState<"Картой" | "Наличными">("Наличными");

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const [checkNumber, setCheckNumber] = useState<number>(() => {
    const savedCheckNumber = localStorage.getItem("checkNumber");
    return savedCheckNumber ? parseInt(savedCheckNumber, 10) : 1;
  });

  const updateLocalStorage = (number: number) => {
    localStorage.setItem("checkNumber", number.toString());
    console.log(`Updated checkNumber in localStorage: ${number}`);
  };

  useEffect(() => {
    updateLocalStorage(checkNumber);
  }, [checkNumber]);

  const incrementCheckNumber = () => {
    setCheckNumber((prevNumber) => {
      const newNumber = prevNumber >= 100 ? 1 : prevNumber + 1;
      updateLocalStorage(newNumber);
      return newNumber;
    });
  };

  const submitOrder = async () => {
    setLoading(true);

    const order: ApiOrder = {
      dishes: cartDishes.CartDish,
      payMode: payM,
    };

    try {
      incrementCheckNumber();
      await axiosApi.post("/orders.json", order);
      dispatch(resetCart());
      await handlePrint();
      navigate("/");
    } catch (e) {
      const offlineRequest = {
        id: Date.now().toString(),
        data: order,
      };
      saveRequest(offlineRequest);
    } finally {
      setLoading(false);
    }
  };

  if (cartDishes.CartDish.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {!loading ? (
        <div className="row mt-2">
          <div className="col-5 m-auto">
            <h4>Checkout</h4>
            <div className="mb-4">
              <CartDishes cartDishes={cartDishes.CartDish} />
              <div className="d-flex align-items-center">
                <b className="col-9">Тип оплаты: </b>
                <select
                  className="form-select mt-1 border-none"
                  aria-label="Default select example"
                  value={payM}
                  onChange={(e) =>
                    setPayM(e.target.value as "Картой" | "Наличными")
                  }
                >
                  <option value="Картой">Картой</option>
                  <option value="Наличными">Наличными</option>
                </select>
              </div>
            </div>
            <div className="d-flex gap-2">
              <Link to="/" className="btn btn-danger">
                Cancel
              </Link>
              <button onClick={submitOrder} className="btn btn-primary">
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}

      {/* Скрытые блоки для печати */}
      <div style={{ display: "none" }}>
        <div ref={printRef}>
          <Receipt
            checkNumber={checkNumber}
            payMode={payM}
            cartDishes={cartDishes.CartDish}
          />
          <Receipt
            checkNumber={checkNumber}
            payMode={payM}
            cartDishes={cartDishes.CartDish}
          />
        </div>
      </div>
    </>
  );
};

export default Checkout;
