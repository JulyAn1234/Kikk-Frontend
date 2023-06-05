import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ProductAddedModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Product added...</DialogTitle>
      <DialogContent style={{ textAlign: 'center' }}>
        <p>The product has been added to your shopping cart!</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eo_circle_light-green_checkmark.svg/2048px-Eo_circle_light-green_checkmark.svg.png" alt="Order Placed" style={{ maxWidth: '25%' }} />
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  );
};

export default ProductAddedModal;
