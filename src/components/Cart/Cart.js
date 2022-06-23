import { useState } from "react";
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

  return (
    <div>
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
                  SubTotal -{" "}
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
      <div className="row"></div>
      <div className="col-12">
        <button onClick={deleteCart} className="btn btn-warning btn-block">
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
};

export default Cart;
