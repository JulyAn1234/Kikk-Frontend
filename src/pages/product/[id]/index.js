import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { getProducts, getProductById } from "@/api/products";
import { getCartCount, addToCart } from "@/api/cart";
import LoadingModal from "@/components/modals/LoadingModal";
import Link from "next/link";
import Cart from "@/components/Cart";

function Product({ product }) {
  const [cartCount, setCartCount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCartCount();
  }, []);

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

  const fetchCartCount = async () => {
    try {
      const cartCount = await getCartCount();
      setCartCount(cartCount);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (productId) => {
    setIsLoading(true);
    try{
      const quantity = await addToCart(productId);
      fetchCartCount();
      window.location.href = window.location.origin;
    }catch(error){
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div style={{ marginTop: "20px", fontFamily: "Arial" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p style={{ fontWeight: "bold" }}>Price: ${product.price}</p>
            <Button variant="contained" color="primary" onClick={() => handleAddToCart(product._id)}>
              Add to Cart
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Link href="/checkout">
            <Cart
              imageUrl="https://cdn-icons-png.flaticon.com/512/263/263142.png"
              number={cartCount}
            />
          </Link>
        </Grid>
      </Grid>
      {isLoading && <LoadingModal />}
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const products = await getProducts();
    const paths = products.map((product) => {
      return { params: { id: product._id.toString() } };
    });
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getStaticProps({ params }) {
  try {
    const product = await getProductById(params.id);

    if (!product) {
      return {
        notFound: true, // Return a 404 page
      };
    }

    return {
      props: {
        product,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default Product;
