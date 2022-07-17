import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { useCartContext } from "../../contexts/cartContext";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const Cart = () => {
  const { cart, deleteCart, removeFromCart, precioTotal } = useCartContext();
  const [ordenId, setOrdenId] = useState("");

  const [procesarOrden, setProcesarOrden] = useState("");

  const [mensaje, setMensaje] = useState("");
  const actualizarMensajes = (mensaje) => {
    setMensaje(mensaje);
  };

  useEffect(() => {
    actualizarMensajes("");

    if (cart.length === 0) {
      actualizarMensajes("Su carrito esta vacio...");
    }

    if (ordenId !== "") {
      actualizarMensajes("Se genero la orden: " + ordenId);
    }
  });

  const handleConfirmarOrden = () => {
    setProcesarOrden("procesar");
  };

  const handleCancelarOrden = () => {
    setProcesarOrden("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombre = e.currentTarget.elements.nombreInput.value;
    const mail = e.currentTarget.elements.mailInput.value;
    const telefono = e.currentTarget.elements.telefonoInput.value;
    const comentarios = e.currentTarget.elements.comentariosInput.value;

    generarOrden({ nombre, mail, telefono, comentarios });
  };

  function generarOrden(comprador) {
    let orden = {};

    orden.comprador = comprador;
    orden.total = precioTotal();

    orden.items = cart.map((cartItem) => {
      const id = cartItem.id;
      const nombre = cartItem.nombre;
      const precio = cartItem.precio;
      const cantidad = cartItem.cantidad;
      const subTotal = cartItem.precio * cartItem.cantidad;

      return { id, nombre, precio, cantidad, subTotal };
    });

    // insertar una orden
    const db = getFirestore();
    const orderCollection = collection(db, "ordenes");
    addDoc(orderCollection, orden)
      .then((resp) => {
        // orden generada
        setOrdenId(resp.id);
        // actualizar stock
        cart.forEach((item) => {
          const updateCollection = doc(db, "productos", item.id.toString());
          updateDoc(updateCollection, {
            stock: item.stock - item.cantidad,
          }).then(() => console.log("actualizado"));
        });
      })
      .finally(() => deleteCart());
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12" style={{ textAlign: "center" }}>
            <h4>{mensaje}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12" style={{ textAlign: "center" }}>
            {cart.length === 0 ? (
              <>
                <Link to="/">
                  <button className="btn btn-primary btn-block m-3">
                    Inicio
                  </button>
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-9">
            <div className="row">
              {cart.map((item) => (
                <div className="col-3" key={item.id}>
                  <div className="card text-white bg-dark border-light w-120 m-3">
                    <div className="card-header">
                      {item.categoria.toUpperCase()}
                    </div>

                    <div className="card-body" style={{ textAlign: "center" }}>
                      <Image
                        src={item.img}
                        width="170"
                        height="170"
                        alt=""
                        rounded="true"
                      ></Image>
                      <p className="card-text mb-1">{item.nombre}</p>
                      <p className="card-text">
                        Presentacion {item.presentacion}
                      </p>
                      <p className="card-text">
                        Precio: $ {parseFloat(String(item.precio)).toFixed(2)}
                      </p>
                      <p className="card-text mb-1">
                        Cantidad: {item.cantidad}
                      </p>
                      <p className="card-text mb-0">
                        SubTotal - ${" "}
                        {parseFloat(
                          String(item.cantidad * item.precio)
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div
                      className="card-footer mt-0"
                      style={{ textAlign: "right" }}
                    >
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                        }}
                        className="btn btn-danger btn-block"
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
                {precioTotal() === 0 ? (
                  ""
                ) : (
                  <button
                    onClick={deleteCart}
                    className="btn btn-warning btn-block"
                  >
                    Vaciar Carrito
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="col-3" style={{ borderLeft: "1px solid #C00" }}>
            <div className="row">
              <div className="col-12" style={{ textAlign: "center" }}>
                {precioTotal() === 0 ? (
                  ""
                ) : (
                  <h1>
                    Total: $ {parseFloat(String(precioTotal())).toFixed(2)}
                  </h1>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12" style={{ textAlign: "center" }}>
                {cart.length === 0 ? (
                  <></>
                ) : (
                  <>
                    {procesarOrden === "procesar" ? (
                      <>
                        <form onSubmit={handleSubmit}>
                          <div
                            class="form-group"
                            style={{ width: "90%", margin: "0 auto" }}
                          >
                            <label htmlFor="nombreInput">Nombre:</label>
                            <input
                              id="nombreInput"
                              type="text"
                              class="form-control"
                              placeholder="su nombre (requerido)"
                              required
                            />
                            <label htmlFor="mailInput">Mail:</label>
                            <input
                              id="mailInput"
                              type="email"
                              class="form-control"
                              placeholder="su mail (requerido)"
                              required
                            />
                            <label htmlFor="telefonoInput">Telefono:</label>
                            <input
                              id="telefonoInput"
                              type="text"
                              class="form-control"
                              placeholder="su numero de telefono (opcional)"
                              required
                            />
                            <div class="messageBox">
                              <label for="message">Comentarios</label>
                              <br />
                              <textarea
                                id="comentariosInput"
                                cols="80"
                                rows="8"
                                placeholder="Si es necesario haga algun comentario a tener en cuenta sobre su orden."
                                pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                                class="form-control"
                              ></textarea>
                            </div>
                          </div>
                          <button type="submit" class="btn btn-primary">
                            Procesar Orden
                          </button>
                          <button
                            onClick={handleCancelarOrden}
                            className="btn btn-danger btn-block m-2"
                          >
                            Cancelar
                          </button>
                        </form>
                      </>
                    ) : (
                      <button
                        onClick={handleConfirmarOrden}
                        className="btn btn-primary btn-block m-2"
                      >
                        Confirmar Orden
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
