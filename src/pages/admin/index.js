import PageDescription from "@/components/PageDescription";
import { Button, Grid } from "@mui/material";
import AddNewProductModal from "@/components/modals/AddNewProductModal";
import EditProductModal from "@/components/modals/EditProductModal";
import ProductItem from "@/components/ProductItem";
import {deleteFromCart } from "src/api/cart.js";
import {getProducts, createProduct, deleteProduct, updateProduct} from "@/api/products";
import React, { useState, useEffect } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [isNewProductModalVisible, setIsNewProductModalVisible] = useState(false)
  const [editProduct, setEditProduct] = useState()
  
  useEffect(() => {
    fetchProducts()
  }, []);

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      console.log(error)
    }
  }


const handleOnSubmit = async values => {
    try{
        console.log(values);
        const tempProducts = Array.from(products)
        if (!!values._id) {
          const updatedProduct = await updateProduct(values);
          const productIndex = tempProducts.findIndex(p => p._id === updatedProduct._id)
          tempProducts[productIndex] = updatedProduct;
        }
        else {
          const newProduct = await createProduct(values);
          tempProducts.push(newProduct);
          console.log(tempProducts);
        }
        setProducts(tempProducts);
        console.log(tempProducts);
        setIsNewProductModalVisible(false);
    }catch(error){
        console.log(error);
    }
  }

  const handleDelete = async id => {
    try{
        await deleteFromCart(id);
        const isDeleted = await deleteProduct(id);
        //console.log(isDeleted);

        if (isDeleted)
            setProducts(prev => prev.filter(p => p._id !== id));
    }catch(error){
        console.log(error);
    }

  }

  return (
    <section>
      <PageDescription
        title="Inventory Admin"
        description="Here you can see, edit or delete your products. You can even add a new one! Click the green button in the bottom right corner to do so." 
      />

      <div style={{ position: 'relative', marginBottom: '60px' }}>
        <Button
          variant="contained"
          size="large"
          onClick={ () => setIsNewProductModalVisible(true) }
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            //borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '50px',
            zIndex: '9999',
          }}
        >
          +
        </Button>
      </div>
      <Grid container spacing={2} sx={{ rowGap: '30px' }}>
        {products.map( (product) => (
            <ProductItem
                key={product._id}
                id={product._id}
                name={product.name}
                imageUrl={product.imageUrl}
                description={product.description}
                price={product.price}
                onDelete={() => handleDelete(product._id)}
                onEdit = {() => setEditProduct(product)}
            />
        )
        )}
      </Grid>

      <AddNewProductModal
        open={ isNewProductModalVisible }
        onClose={ () => setIsNewProductModalVisible(false) }
        onSubmit={ handleOnSubmit }
      />
      <EditProductModal
        open={ !!editProduct }
        onClose={ () => setEditProduct() }
        onSubmit={ handleOnSubmit }
        product={ editProduct }
      />
    </section>
  );
}
