import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import NewDish from "./containers/NewDish/NewDish";
import Checkout from "./containers/Checkout/Checkout";
import CustomerForm from "./containers/CustomerForm/CustomerForm";
import EditDish from "./containers/EditDish/EditDish";
import Orders from "./containers/Orders/Orders";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/new-dish" element={<NewDish/>}/>
        <Route path="/edit-dish/:id" element={<EditDish/>}/>
        <Route path="/checkout" element={<Checkout/>}>
          <Route path="continue" element={<CustomerForm/>}/>
        </Route>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="*" element={<h1>Not found!</h1>}/>
      </Routes>
    </Layout>
  );
}

export default App;
