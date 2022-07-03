import "./CartWidget.css";
import Image from "react-bootstrap/Image";
import carritoImagen from "../../assets/images/carrito-compras.png";
import { useCartContext } from "../../contexts/cartContext";

function CartWidget() {
  const { cantidadProductos, cart } = useCartContext();

  return (
    <>
      {cart.length === 0 ? (
        <></>
      ) : (
        <>
          <Image
            src={carritoImagen}
            className="carrito-imagen"
            alt="imagen carrito"
          ></Image>
          <span className="carrito-badge">
            {cart.length === 0 ? 0 : cantidadProductos()}
          </span>
        </>
      )}
    </>
  );
}

export default CartWidget;
