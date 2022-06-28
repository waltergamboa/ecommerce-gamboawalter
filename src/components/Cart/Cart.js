import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../contexts/cartContext";

const Cart = () => {
  const { cart, deleteCart, removeFromCart } = useCartContext();
  const [removido, setRemovido] = useState(false);

  const remover = (event) => {
    const myArray = event.target.id.split("-");
    const id = myArray[1];
    removeFromCart({ id: id });
    setRemovido(!removido);
  };

  const [sumaTotal, setSumaTotal] = useState(0);

  const actualizarSumaTotal = () => {
    const sumar = cart.reduce((acc, el) => acc + el.cantidad * el.precio, 0);
    setSumaTotal(sumar);
    sumar === 0
      ? actualizarMensajes("Su carrito esta vacio...")
      : actualizarMensajes("");
  };

  const [mensaje, setMensaje] = useState("");

  const actualizarMensajes = (mensaje) => {
    setMensaje(mensaje);
  };

  useEffect(() => {
    actualizarSumaTotal();
  });

  return (
    <div>
      <div className="row">
        <div className="col-12" style={{ textAlign: "center" }}>
          <span>{mensaje}</span>
        </div>
        <div className="col-12" style={{ textAlign: "center" }}>
          {cart.length === 0 ? (
            <Link to="/">
              <button className="btn btn-primary btn-block m-3">Inicio</button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12" style={{ textAlign: "center" }}>
          {sumaTotal === 0 ? (
            ""
          ) : (
            <h1>Total: $ {parseFloat(String(sumaTotal)).toFixed(2)}</h1>
          )}
        </div>
      </div>
      <div className="row">
        {cart.map((item) => (
          <div className="col-3" key={item.id}>
            <div className="card text-white bg-dark border-light w-120 m-3">
              <div className="card-header">{item.categoria.toUpperCase()}</div>

              <div className="card-body" style={{ textAlign: "center" }}>
                <img
                  src={item.img}
                  width="200"
                  height="200"
                  alt=""
                  rounded
                ></img>
                <p className="card-text">{item.nombre}</p>
                <p className="card-text">Presentacion {item.presentacion}</p>
                <p className="card-text">
                  Precio: {parseFloat(String(item.precio)).toFixed(2)}
                </p>
                <p className="card-text">Cantidad: {item.cantidad}</p>
                <p className="card-text">
                  SubTotal - ${" "}
                  {parseFloat(String(item.cantidad * item.precio)).toFixed(2)}
                </p>
              </div>
              <div className="card-footer" style={{ textAlign: "right" }}>
                <button
                  onClick={remover}
                  id={`producto-${item.id}`}
                  className="btn btn-warning btn-block"
                >
                  Borrar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-12" style={{ textAlign: "center" }}>
          {sumaTotal === 0 ? (
            ""
          ) : (
            <button onClick={deleteCart} className="btn btn-warning btn-block">
              Vaciar Carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
