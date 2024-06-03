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

const Checkout: React.FC = () => {
  useSyncOfflineRequests();
  const componentRef = useRef<HTMLDivElement>(null);
  const [payM, setPayM] = useState<'Картой' | 'Наличными'>('Картой');
  const handlePrint = async () => {
    const ticketElement = componentRef.current?.querySelector(
      ".ticket"
    ) as HTMLElement;
    if (ticketElement) {
      const options = {
        margin: 0,
        filename: "ticket.pdf",
        jsPDF: { unit: "px", format: [800, 800], orientation: "portrait" },
      };

      const exporter = new Html2Pdf(ticketElement, options);
      const pdfBlob = (await exporter.getPdf(options)) as Blob;

      const pdfUrl = URL.createObjectURL(pdfBlob);

      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.border = "none";
      document.body.appendChild(iframe);

      iframe.src = pdfUrl;
      iframe.onload = () => {
        iframe.contentWindow?.print();
        URL.revokeObjectURL(pdfUrl);
      };
    }
  };

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
          <div className="m-auto" style={{ maxWidth: "800px" }}>
            <h4>Checkout</h4>
            <CartDishes cartDishes={cartDishes.CartDish} ref={componentRef} />
            <div className="d-flex gap-2">
              <select
                className="form-select"
                aria-label="Default select example"
                value={payM}
                onChange={(e) => setPayM(e.target.value as 'Картой' | 'Наличными')}
              >
                <option value="Картой">Картой</option>
                <option value="Наличными">Наличными</option>
              </select>
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
