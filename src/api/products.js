export const getProducts = async () => {
    try{
        const response = await fetch(`${process.env.SERVER_URL}/products`)
        const productsJson = await response.json()

        return productsJson.products
    } catch(error){
        console.log(error)
        return[]
    }
}

export const getProductById = async (id) => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/products/${id}`)
      const productsJson = await response.json()
      return productsJson.product
    } catch (error) {
      console.log(error)
      
    }
  }
  
  export const updateProduct = async product => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/products/${product._id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
      const productsJson = await response.json()
      return productsJson
    } catch (error) {
      console.log(error)
      return {}
    }
  }
  
  export const createProduct = async product => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/products`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
  
      const productsJson = await response.json()
      return productsJson.productSaved
    } catch (error) {
      console.log(error)
      return {}
    }
  }
  
  export const deleteProduct = async id => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/products/${id}`, {
        method: 'DELETE',
      })
  
      return response.status === 204
    } catch (error) {
      console.log(error)
      return false
    }
  }