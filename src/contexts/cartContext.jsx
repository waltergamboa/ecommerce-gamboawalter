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
    actualizarCantidad();
  };

  const deleteCart = () => {
    setCart([]);
    actualizarCantidad();
  };

  const removeFromCart = (item) => {
    const { id } = item;
    const indice = cart.findIndex((i) => i.id === parseInt(id));
    cart.splice(indice, 1);
    actualizarCantidad();
  };

  const isInCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      return true;
    } else {
      return false;
    }
  };

  const [cantidad, setCantidad] = useState(0);
  const actualizarCantidad = () => {
    const sumaCantidad = cart.reduce((acc, el) => acc + el.cantidad, 0);
    setCantidad(sumaCantidad);
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        cantidad,
        addToCart,
        deleteCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
