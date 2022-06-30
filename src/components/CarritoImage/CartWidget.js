import "./CartWidget.css";
import Image from "react-bootstrap/Image";
import carritoImagen from "../../assets/images/carrito-compras.png";
import { useCartContext } from "../../contexts/cartContext";
import { useEffect, useState } from "react";

function CartWidget() {
  const { cantidad } = useCartContext();
  // const [cantidad, setCantidad] = useState(0);

  // const actualizarCantidad = () => {
  //   const sumaCantidad = cart.reduce((acc, el) => acc + el.cantidad, 0);
  //   setCantidad(sumaCantidad);
  // };

  // useEffect(() => {
  //   actualizarCantidad();
  // });

  return (
    <>
      {cantidad === 0 ? (
        <></>
      ) : (
        <>
          <Image
            src={carritoImagen}
            className="carrito-imagen"
            alt="imagen carrito"
          ></Image>
          <span className="carrito-badge">{cantidad}</span>
        </>
      )}
    </>
  );
}

export default CartWidget;
