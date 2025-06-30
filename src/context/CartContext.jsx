import {createContext, useState, useContext, useEffect} from "react";

const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({children}) => {
  const [cartItem, setCartItem] = useState([])

  useEffect(() => {
    const inCart = localStorage.getItem("cart")
    //convert back to JS object
    if(inCart) setCartItem(JSON.parse(inCart))
  }, []);

  //anytime cart updates, items added/removed, store it to local storage
  useEffect(() => {
    //store the cart items in a json string into local storage(only allows strings)
    localStorage.setItem('cart', JSON.stringify(cartItem))
  }, [cartItem]);

  const addToCart = (game) => {
    setCartItem(prev => [...prev, game])
  }

  const removeFromCart = (gameID) =>{
    setCartItem(prev => prev.filter(game => game.id !== gameID))
  }

  const value = {
    cartItem,
    addToCart,
    removeFromCart
  }


  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
}