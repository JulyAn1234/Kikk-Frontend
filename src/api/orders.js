
export const getOrders = async () => {
    try{
        const response = await fetch(`${process.env.SERVER_URL}/orders`)
        const ordersJson = await response.json()

        return ordersJson.orders
    } catch(error){
        console.log(error)
        return[]
    }
}

export const getOrder = async (id) => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/orders/${id}`)
      const ordersJson = await response.json()
      return ordersJson.order
    } catch (error) {
      console.log(error)
      return []
    }
  }
  

  export const createOrder = async order => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/orders`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
  
      const ordersJson = await response.json();
      return ordersJson.orderSaved;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error
    }
  };