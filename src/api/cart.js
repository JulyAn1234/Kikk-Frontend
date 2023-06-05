export const getCart = async () => {
  try{
      const response = await fetch(`${process.env.SERVER_URL}/cart`)
      const cartJson = await response.json()

      return cartJson.Cart
  } catch(error){
      console.log(error)
      return[]
  }
}

export const getCartCount = async () => {
    try{
        const response = await fetch(`${process.env.SERVER_URL}/cartcount`)
        const cartCountJson = await response.json()

        return cartCountJson.cartCount
    } catch(error){
        console.log(error)
        return 0
    }
}

  export const addToCart = async (productId) => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/addtocart`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
  
      const responseData = await response.json();
      const productOnCartSaved = responseData.productOnCartSaved;
  
      return productOnCartSaved.quantity;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };
  
  export const deleteFromCart = async id => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/deletefromcart/${id}`, {
        method: 'DELETE',
      })
  
      return response.status === 204
    } catch (error) {
      console.log(error)
      return false
    }
  }

  export const quitOneFromCart = async id => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/quitonefromcart/${id}`, {
        method: 'PUT'
      })
      const newProductOnCart = await response.json()
      return newProductOnCart
    } catch (error) {
      console.log(error)
      return {}
    }
  }