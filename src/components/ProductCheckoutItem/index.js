import React from 'react';
import { Grid, Divider, Button } from "@mui/material";

const ShoppingCartItem = ({ image, name, price, quantity, handleAdd, handleDelete, handleQuitOne }) => {
  const total = (price * quantity).toFixed(2);
  const truncatedName = name.length > 150 ? `${name.slice(0, 150)}...` : name;

  const itemContainerStyles = {
    width: '75%',
    height: '140px',
  };

  const productImageStyles = {
    width: '120px',
    height: '80px',
    objectFit: 'contain',
    marginRight: '10px',
  };

  const productNameStyles = {
    color: 'black',
    fontFamily: 'Arial',
    fontSize: '18px',
    margin: 0,
    textAlign: 'justify',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
  };

  const productInfoStyles = {
    color: 'black',
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '4px 0',
  };

  const dividerStyles = {
    backgroundColor: '#FDB44E',
    height: '1px',
    margin: '0px',
  };

  const buttonStyles = {
    minWidth: 'unset',
    width: '32px',
    height: '32px',
    fontSize: '14px',
    margin: '2px',
    borderRadius: '50%',
  };

  const addButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#80C672',
    color: '#FFFFFF',
  };

  const removeButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#E74242',
    color: '#FFFFFF',
  };

  const deleteButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#FFA500',
    color: '#FFFFFF',
  };

  return (
    <div className="shopping-cart-item">
      <Grid container spacing={2} alignItems="center" style={itemContainerStyles}>
        <Grid item xs={2}>
          <img src={image} alt={name} style={productImageStyles} />
        </Grid>
        <Grid item xs={6}>
          <p style={productNameStyles}>{truncatedName}</p>
        </Grid>
        <Grid item xs={2}>
          <p style={productInfoStyles}>
            Quantity: <strong>{quantity}</strong>
          </p>
          <p style={productInfoStyles}>
            Price: <strong>${price}</strong>
          </p>
          <p style={productInfoStyles}>
            Total: <strong>${total}</strong>
          </p>
        </Grid>
        <Grid item xs={2} container justifyContent="flex-end">
          <Button variant="contained" onClick={handleAdd} style={addButtonStyles}>+</Button>
          <Button variant="contained" onClick={handleQuitOne} style={removeButtonStyles}>-</Button>
          <Button variant="contained" onClick={handleDelete} style={deleteButtonStyles}>X</Button>
        </Grid>
      </Grid>
      <Divider style={{ ...dividerStyles, width: '75%' }} />
    </div>
  );
};

export default ShoppingCartItem;
