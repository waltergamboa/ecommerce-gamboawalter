import { createContext, useState, useContext } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    if (isInCart(item.id)) {
      let itemTmp = cart.find((a) => a.id === item.id);
      itemTmp.cantidad = itemTmp.cantidad + item.cantidad;

      const indice = cart.findIndex((i) => i.id === item.id);
      cart[indice] = itemTmp;
    } else {
      setCart([...cart, item]);
    }
  };

  const deleteCart = () => {
    setCart([]);
  };

  const removeFromCart = (item) => {
    const { id } = item;
    const indice = cart.findIndex((i) => i.id === parseInt(id));
    cart.splice(indice, 1);
  };

  const isInCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
