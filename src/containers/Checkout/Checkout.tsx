import React, { useRef, useState } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetCart, selectCartDishes } from "../../store/cartSlice";
import { ApiOrder } from "../../types";
import axiosApi from "../../axiosApi";
import CartDishes from "../../components/Cart/CartDishes";
import Spinner from "../../components/Spinner/Spinner";
import Html2Pdf from "js-html2pdf";
import useSyncOfflineRequests from "../../app/hooks/useSyncOfflineRequest";
import { saveRequest } from "../../app/utils/localStorageUtil";
import { useReactToPrint } from "react-to-print";

const Checkout: React.FC = () => {
  useSyncOfflineRequests();
  const componentRef = useRef<HTMLDivElement>(null);
  const [payM, setPayM] = useState<"Картой" | "Наличными">("Картой");
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartDishes = useAppSelector(selectCartDishes);
  const [loading, setLoading] = useState(false);

  const submitOrder = async () => {
    setLoading(true);
    await handlePrint();

    const order: ApiOrder = {
      dishes: cartDishes.CartDish,
      payMode: payM,
    };

    try {
      await axiosApi.post("/orders.json", order);
      dispatch(resetCart());
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
          <div className="m-auto" style={{ maxWidth: "700px" }}>
            <h4>Checkout</h4>
            <div className="mb-4" ref={componentRef}>
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
              <NavLink
                to="/orders"
                onClick={submitOrder}
                className="btn btn-primary"
              >
                Continue
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Checkout;
