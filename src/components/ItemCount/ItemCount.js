import "./ItemCount.css";
import mas from "../../assets/images/mas.png";
import menos from "../../assets/images/menos.png";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { Link } from "react-router-dom";

function ItemCount({ stock, inicial, onAdd }) {
  const [cantidad, setCantidad] = useState(inicial);

  const cantidadMas = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const cantidadMenos = () => {
    if (cantidad > inicial) {
      setCantidad(cantidad - 1);
    }
  };

  const validar = () => {
    if (stock > 0) {
      onAdd(cantidad);
    }
    setCantidad(inicial);
  };

  return (
    <>
      <div className="container" style={{ width: "70%", margin: "0 auto" }}>
        <div className="row">
          <div className="col-12 mb-0">
            <h3>Stock {stock}</h3>
            {/* { 
            <>
            <h3>Stock {stockTotal}</h3>
            <h2>Pedido {cantidad}</h2>
  {(cantidad >= stockTotal) ?
            <h3>Sin stock</h3>
            :
            <></>}
            </>
            } */}
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <button onClick={cantidadMenos}>
              <Image src={menos} className="imagenBoton"></Image>
            </button>
          </div>
          <div className="col-4">
            <h3>{cantidad}</h3>
          </div>
          <div className="col-4">
            <button onClick={cantidadMas}>
              <Image src={mas} className="imagenBoton"></Image>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {stock <= 0 ? (
              <Link to="/">
                <button className="btn btn-primary btn-block m-3">
                  Seguir Comprando
                </button>
              </Link>
            ) : (
              <button
                className="btn btn-primary btn-block m-3"
                onClick={validar}
              >
                Agregar al Carrito
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemCount;
