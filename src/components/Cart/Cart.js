import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { useCartContext } from "../../contexts/cartContext";
import { addDoc, collection, doc, documentId, getDocs, getFirestore, query, updateDoc, where, writeBatch } from "firebase/firestore"

const Cart = () => {
  const { cart, deleteCart, removeFromCart, precioTotal } = useCartContext();
  const [ordenId, setOrdenId] = useState("");

  const [mensaje, setMensaje] = useState("");
  const actualizarMensajes = (mensaje) => {
    setMensaje(mensaje);
  };

  useEffect(() => {
    precioTotal() === 0
      ? actualizarMensajes("Su carrito esta vacio...")
      : actualizarMensajes("");

    ordenId !== "" ? actualizarMensajes("Su orden es:" + ordenId)
    : actualizarMensajes("");

  });

  function generarOrden(e) {
    e.preventDefault()
    let orden = {}     
    
    orden.buyer = {name: 'walter1', email: 'walter@gmail.com', phone: '123456789'}
    orden.total = precioTotal()

    orden.items = cart.map(cartItem => {
        const id = cartItem.id
        const nombre = cartItem.nombre
        const cantidad = cartItem.cantidad        
        const precio = cartItem.precio * cartItem.cantidad

        
        return {id, nombre, cantidad, precio}   
    })    
    // insertar una orden
    const db = getFirestore()
    const orderCollection = collection(db, 'ordenes')
    addDoc(orderCollection, orden)
    .then(resp => setOrdenId(resp.id) )
    .finally(()=>deleteCart())
  }


  return (
    <div>
      <div className="row">
        <div className="col-12" style={{ textAlign: "center" }}>
          <span>{mensaje}</span>
        </div>
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
            <>
                  <button onClick={generarOrden} className="btn btn-primary btn-block m-3">
                  Confirmar Orden
                </button>
            </>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12" style={{ textAlign: "center" }}>
          {precioTotal() === 0 ? (
            ""
          ) : (
            <h1>Total: $ {parseFloat(String(precioTotal())).toFixed(2)}</h1>
          )}
        </div>
      </div>
      <div className="row">
        {cart.map((item) => (
          <div className="col-3" key={item.id}>
            <div className="card text-white bg-dark border-light w-120 m-3">
              <div className="card-header">{item.categoria.toUpperCase()}</div>

              <div className="card-body" style={{ textAlign: "center" }}>
                <Image
                  src={item.img}
                  width="200"
                  height="200"
                  alt=""
                  rounded="true"
                ></Image>
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
