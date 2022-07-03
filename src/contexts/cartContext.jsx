import { createContext, useState, useContext } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (objProducto) => {
    let carritoAnterior = [...cart];

    if (carritoAnterior.some((item) => item.id === objProducto.id)) {
      carritoAnterior.find((item) => item.id === objProducto.id).cantidad +=
        objProducto.cantidad;
      setCart(carritoAnterior);
    } else {
      setCart([...cart, objProducto]);
    }
  };

  const deleteCart = () => {
    setCart([]);
  };

  const cantidadProductos = () => {
    const sumaCantidad = cart.reduce((acc, el) => acc + el.cantidad, 0);
    return sumaCantidad;
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((nuevoProducto) => nuevoProducto.id !== id));
  };

  const precioTotal = () => {
    let total = 0;

    cart.forEach((nuevoProducto) => {
      total +=
        parseInt(nuevoProducto.precio) * parseInt(nuevoProducto.cantidad);
    });

    return parseInt(total);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteCart,
        removeFromCart,
        cantidadProductos,
        precioTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
