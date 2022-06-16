import "./ItemCount.css";
import mas from "../../assets/images/mas.png";
import menos from "../../assets/images/menos.png";
import Image from "react-bootstrap/Image";
import { useState } from "react";

function ItemCount({ stock, inicial, onAdd }) {
  const [cantidad, setCantidad] = useState(parseInt(inicial));

  const cantidadMas = () => {
    if (cantidad + 1 <= stock) {
      setCantidad(cantidad + 1);
    }
  };

  const cantidadMenos = () => {
    if (cantidad - 1 >= parseInt(inicial)) {
      setCantidad(cantidad - 1);
    }
  };

  const validar = () => {
    if (stock > 0) {
      onAdd(cantidad);
    }
    setCantidad(parseInt(inicial));
  };

  return (
    <>
      <div className="container" style={{ width: "50%", margin: "0 auto" }}>
        <div className="row">
          <div className="col-12 mb-4">
            <h2>Oregano</h2>
            <h3>Stock {stock}</h3>
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
            <button className="boton" onClick={validar}>
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemCount;
