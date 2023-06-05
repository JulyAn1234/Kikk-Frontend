import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ProductForm from "../forms/ProductForm";

export default function EditProductModal ({ open, onClose, onSubmit, product }) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Editing this product...
      </DialogTitle>
      <DialogContent>
        <ProductForm
          editValues={product}
          onSubmit={onSubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          form='product-form'
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          form='product-form'
          onClick={onClose}
        >
          Update product
        </Button>
      </DialogActions>
    </Dialog>
  )
}