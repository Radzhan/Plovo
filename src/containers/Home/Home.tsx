import React from 'react';
import Dishes from "../../components/Dishes/Dishes";
import Cart from "../../components/Cart/Cart";
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <div className={styles.dishesBox}>
        <Dishes/>
      </div>
      <div className={styles.cardBox}>
        <Cart />
      </div>
    </div>
  );
};

export default Home;