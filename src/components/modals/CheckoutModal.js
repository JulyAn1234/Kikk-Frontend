import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import CheckoutForm from "../forms/CheckoutForm";

export default function AddNewProductModal({ open, onClose, onSubmit }) {

  const handleFormSubmit = async () => {
    try {
      const isValid = await onSubmit();
      //onClose();
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Setting up your order...</DialogTitle>
      <DialogContent>
        <CheckoutForm onSubmit={onSubmit} />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" type="reset" form="checkout-form">
          Clear form
        </Button>
        <Button variant="contained" type="submit" form="checkout-form" onClick={handleFormSubmit}>
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
