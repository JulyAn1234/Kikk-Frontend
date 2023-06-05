import { useRouter } from "next/router";
import { Grid, Link, Typography } from "@mui/material";
import styles from "../styles/Home.module.css";
import ProductItem from "../components/ProductItem";
import OrderPlacedModal from "../components/modals/OrderPlacedModal";
import ProductAddedModal from "../components/modals/ProductAddedModal";
import Cart from "@/components/Cart";
import { getProducts } from "@/api/products";
import { getCartCount, addToCart } from "@/api/cart";
import React, { useState, useEffect } from "react";

export default function Home() {


  const router = useRouter();
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState();

  useEffect(() => {
    fetchProducts();
    fetchCartCount();

    const queryParams = new URLSearchParams(window.location.search);
    const isOrderSet = queryParams.get('orderSet');
    setIsModalVisible(isOrderSet)
  }, []);

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartCount = async () => {
    try {
      const cartCount = await getCartCount();
      setCartCount(cartCount);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const quantity = await addToCart(productId);
      fetchCartCount();
      setIsCartModalVisible(true);
  
      setTimeout(() => {
        setIsCartModalVisible(false);
      }, 1500); // 3000 milliseconds = 3 seconds
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <section>
      <OrderPlacedModal open={isModalVisible} onClose={() => setIsModalVisible(false)}/>
      <ProductAddedModal open={isCartModalVisible} onClose={() => setIsCartModalVisible(false)}/>
      <div className={styles.HeadingContainer}>
        <Typography variant="h4" align="center" color="primary" className={styles.Heading}>
          <span role="img" aria-label="sparkles">
            ✨
          </span>{" "}
          Explore Our Amazing Products!{" "}
          <span role="img" aria-label="sparkles">
            ✨
          </span>
        </Typography>
      </div>
      <Grid container spacing={2}>
        {products.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            name={product.name}
            imageUrl={product.imageUrl}
            description={product.description}
            price={product.price}
            CartHandler = {() => handleAddToCart(product._id)}
          />
        ))}
      </Grid>
      <Link href="/checkout">
        <Cart imageUrl="https://cdn-icons-png.flaticon.com/512/263/263142.png" number={cartCount} />
      </Link>
    </section>
  );
}
