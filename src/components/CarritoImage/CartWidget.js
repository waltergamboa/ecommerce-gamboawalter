import "./CartWidget.css";
import Image from "react-bootstrap/Image";
import carritoImagen from "../../assets/images/carrito-compras.png";

function CartWidget() {
  return (
    <Image
      src={carritoImagen}
      className="carrito-imagen"
      alt="imagen carrito"
    ></Image>
  );
}

export default CartWidget;
