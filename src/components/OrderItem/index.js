import React from 'react';
import { Grid, Divider } from "@mui/material";

const OrderItem = ({ order }) => {
  const { _id, name, address, total, cart } = order;

  const orderContainerStyles = {
    width: '100%',
    height: '140px',
  };

  const orderIdStyles = {
    color: 'black',
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '4px 0',
  };

  const orderInfoStyles = {
    color: 'black',
    fontFamily: 'Arial',
    fontSize: '16px',
    margin: '4px 0',
  };

  const dividerStyles = {
    backgroundColor: '#FDB44E',
    height: '1px',
    margin: '0px',
  };

  const getProductCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="order-item">

      <Grid container spacing={2} alignItems="center" style={orderContainerStyles}>
        <Grid item xs={12}>
          <p style={orderIdStyles}>Order ID: {_id}</p>
        </Grid>
        <Grid item xs={6}>
          <p style={orderInfoStyles}>Name: {name}</p>
        </Grid>
        <Grid item xs={6}>
          <p style={orderInfoStyles}>Address: {address}</p>
        </Grid>
        <Grid item xs={6}>
          <p style={orderInfoStyles}>Total: ${total}</p>
        </Grid>
        <Grid item xs={6}>
          <p style={orderInfoStyles}>Product Count: {getProductCount()}</p>
        </Grid>
      </Grid>
      <Divider style={{ ...dividerStyles, width: '100%' }} />
    </div>
  );
};

export default OrderItem;
