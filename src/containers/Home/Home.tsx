import React from 'react';
import Dishes from "../../components/Dishes/Dishes";
import Cart from "../../components/Cart/Cart";

const Home: React.FC = () => {
  return (
    <div className="row mt-2">
      <div className="col-5 mr-auto">
        <Dishes/>
      </div>
      <div className="col-5">
        <Cart />
      </div>
    </div>
  );
};

export default Home;