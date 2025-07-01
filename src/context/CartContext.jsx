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
    //since the API used does not have a price tag to it, generate a random number as the price
    const withPrice = { ...game, price: Math.floor(Math.random() * (70 - 10 + 1)) + 10 };

    setCartItem(prev => {
      if (prev.some(item => item.id === game.id)) return prev;
      return [...prev, withPrice];
    });
  }

  const removeFromCart = (gameID) =>{
    setCartItem(prev => prev.filter(game => game.id !== gameID))
  }

  const getTotalPrice = () => {
    return cartItem.reduce((sum, item) => sum + (item.price || 0), 0);
  };

  const value = {
    cartItem,
    addToCart,
    removeFromCart,
    getTotalPrice
  }


  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
}