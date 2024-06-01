import React, { useRef, useState } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetCart, selectCartDishes } from "../../store/cartSlice";
import { ApiOrder } from "../../types";
import axiosApi from "../../axiosApi";
import CartDishes from "../../components/Cart/CartDishes";
import Spinner from "../../components/Spinner/Spinner";
import { useReactToPrint } from "react-to-print";
import Html2Pdf from 'js-html2pdf';
import { saveRequest } from "../../app/utils/localStorageUtil";
import useSyncOfflineRequests from "../../app/hooks/useSyncOfflineRequest";

const Checkout: React.FC = () => {
  useSyncOfflineRequests()
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onPrintError: (error) => console.log(error),
    print: async (printIframe) => {
      const document = printIframe?.contentDocument;
      if (document) {
        const ticketElement = document.getElementsByClassName("ticket")[0] as HTMLElement;
        ticketElement.style.display = "block";
        const options = {
          margin: 0,
          filename: "ticket.pdf",
          jsPDF: { unit: "px", format: [600, 800], orientation: "portrait" },
        };
        const exporter = new Html2Pdf(ticketElement, options);
        await exporter.getPdf(options);
      }
    },
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartDishes = useAppSelector(selectCartDishes);
  const [loading, setLoading] = useState(false);

  const submitOrder = async () => {
    setLoading(true);
    handlePrint();

    const order: ApiOrder = {
      dishes: cartDishes,
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

  if (cartDishes.length === 0) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {!loading ? (
        <div className="row mt-2">
          <div className="col-4 m-auto">
            <h4>Checkout</h4>
            <CartDishes cartDishes={cartDishes} ref={componentRef} />
            <div className="d-flex gap-2">
              <Link to="/" className="btn btn-danger">
                Cancel
              </Link>
              <NavLink to="/orders" onClick={submitOrder} className="btn btn-primary">
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
