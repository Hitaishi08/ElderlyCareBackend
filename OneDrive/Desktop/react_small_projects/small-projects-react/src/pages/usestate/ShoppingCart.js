import React,{useState} from 'react'

function ShoppingCart() {
   const products=[
    { id: 1, name: 'Apple', price: 1.0 },
    { id: 2, name: 'Banana', price: 0.5 },
    { id: 3, name: 'Cherry', price: 2.0 },
   ];
   const [cart,setCart]=useState([]);
   const addToCart=(product)=>{
    setCart(prevCart=>{
        const itemincart=prevCart.find(item=>item.id===product.id);
        if(itemincart){
            return prevCart.map(item=>item.id===product.id?{...item,quantity:item.quantity+1}:item);
        }
        else{
            return [...prevCart,{...product,quantity:1}];
        }
    })
   };

   const changeQuantity=(id,delta)=>{
        setCart(prevCart=>
            prevCart.map(item=>id===item.id?{...item,quantity:item.quantity+delta}:item).filter(item=>item.quantity>0)
        );
   };
   const removeFromCart=(id)=>{
    setCart(prevCart=>prevCart.filter(item=>id!==item.id));
   };
   const total = Array.isArray(cart)
   ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
   : 0;
 
  return (
    <div style={{ padding: '20px' }}>
        <h1>Products</h1>
        {products.map(product => (
        <div key={product.id}>
          <span>{product.name} - ${product.price.toFixed(2)}</span>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}

      <h2 style={{ marginTop: '30px' }}>🛒 Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        cart.map(item => (
          <div key={item.id}>
            <span>
              {item.name} (${item.price}) x {item.quantity}
            </span>
            <button onClick={() => changeQuantity(item.id, +1)}>+</button>
            <button onClick={() => changeQuantity(item.id, -1)}>-</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      )}

      <h3>Total: ${total.toFixed(2)}</h3>
      
    </div>
  )
}

export default ShoppingCart
