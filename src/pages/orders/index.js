import React, { useEffect, useState } from 'react';
import { getOrders } from 'src/api/orders.js';
import OrderItem from "@/components/OrderItem";
import styles from "@/styles/Home.module.css";
import { Typography} from "@mui/material";
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const orders = await getOrders();
      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    <div className={styles.HeadingContainer}>
      <Typography variant="h4" align="center" color="primary" className={styles.Heading}>
        Here you can Check your orders{" "}
        <span role="img" aria-label="sparkles">
          🧾
        </span>
      </Typography>
    </div>
      {orders.map((order) => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrdersPage;
