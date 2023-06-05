import React, { useState } from 'react';
import { Typography, Grid, Button } from "@mui/material";
import ShoppingCartItem from "@/components/ProductCheckoutItem";
import styles from "@/styles/Home.module.css";
import LoadingModal from "@/components/modals/LoadingModal";
import CheckoutModal from "@/components/modals/CheckoutModal";
import { getCart, addToCart, quitOneFromCart, deleteFromCart } from "src/api/cart.js";
import { createOrder } from "src/api/orders.js";
import { getProductById } from "src/api/products";

export default function CheckoutPage({ items, total, cart }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false)

  const redirectToRootPage = async () => {
    setIsLoading(true);
    try {
      // Perform any necessary operations before redirecting
  
      // Redirect to the root page of your website
      window.location.href = window.location.origin;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  

  const reloadPage = async () => {
    setIsLoading(true);
    try {
      // Perform any necessary operations before reloading the page
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const quantity = await addToCart(productId);
      reloadPage();
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuitOneFromCart = async (productId) => {
    try {
      await quitOneFromCart(productId);
      reloadPage();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFromCart = async (productId) => {
    try {
      await deleteFromCart(productId);
      reloadPage();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = async values => {
    setIsLoading(true);
    try {
      const order = {
        name: values.name,
        address: values.address,
        total: total,
        cart: cart
      };
  
      console.log(order);
  
      //creating order
      await createOrder(order);

      //cleaning cart
      const updatedCart = items.map(async (item) => {
        await deleteFromCart(item.productId);
      });
      
      await Promise.all(updatedCart);
      window.location.href = `${window.location.origin}?orderSet=true`;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  
  if (items.length === 0) {
    return (
      <div className={styles.HeadingContainer}>
      <Typography variant="h4" align="center" color="primary" className={styles.Heading}>
        <span role="img" aria-label="sparkles">
          ❌
        </span>{" "}
        Your Shopping Cart is empty{" "}
        <span role="img" aria-label="sparkles">
          🛒
        </span>
      </Typography>
    </div>
    );
  }

  return (
    <>
      <div className={styles.HeadingContainer}>
        <Typography variant="h4" align="center" color="primary" className={styles.Heading}>
          <span role="img" aria-label="sparkles">
            💰
          </span>{" "}
          Take a look at your shopping cart{" "}
          <span role="img" aria-label="sparkles">
            🛒
          </span>
        </Typography>
      </div>

      {items.map((item, index) => (
        <ShoppingCartItem
          key={item.productId}
          image={item.image}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          handleAdd={() => handleAddToCart(item.productId)}
          handleDelete={() => handleDeleteFromCart(item.productId)}
          handleQuitOne={() => handleQuitOneFromCart(item.productId)}
        />
      ))}

      <Grid container justifyContent="flex-end" style={{ marginTop: '20px' }}>
        <Typography variant="h6" color="primary" style={{ marginRight: '10px' }}>
          Total: {total}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setIsCheckoutModalVisible(true)}>
          Checkout
        </Button>
      </Grid>

      <CheckoutModal
        open={ isCheckoutModalVisible }
        onClose={ () => setIsCheckoutModalVisible(false) }
        onSubmit={ handleOnSubmit }
      />

      {isLoading && <LoadingModal />}
    </>
  );
}

export async function getServerSideProps() {
  // Fetch shopping cart items from the server

  let total = 0;

  const cart = await getCart();

  const items = await Promise.all(
    cart.map(async (productOnCart) => {
      const { productId, quantity } = productOnCart;

      // Fetch product data based on the ID
      const productData = await getProductById(productId);
      //console.log(productData);
      //getting the total for this product on the cart
      const TotalProduct = productData.price * quantity;
      //Acumulating the total price of the checkout
      total = total + TotalProduct;
      // Create a new object with the fetched data and attribute
      const newObj = {
        productId: productId,
        image: productData.imageUrl,
        name: productData.name,
        price: productData.price,
        quantity: quantity
      };

      return newObj;
    })
  );
  total = total.toFixed(2);
  return {
    props: {
      items,
      total,
      cart
    },
  };
}
