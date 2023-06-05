import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const OrderPlacedModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Your Order Has Been Placed</DialogTitle>
      <DialogContent style={{ textAlign: 'center' }}>
        <p>Thank you for buying with us!</p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eo_circle_light-green_checkmark.svg/2048px-Eo_circle_light-green_checkmark.svg.png" alt="Order Placed" style={{ maxWidth: '25%' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderPlacedModal;
