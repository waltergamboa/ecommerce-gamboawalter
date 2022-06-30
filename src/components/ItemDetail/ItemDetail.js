import { useState } from "react";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import ItemCount from "../../components/ItemCount/ItemCount";
import { useCartContext } from "../../contexts/cartContext";

const ItemDetail = ({ producto }) => {
  const [stock, setStock] = useState(100);
  const [agregado, setAgregado] = useState("");
  const { addToCart } = useCartContext();

  function onAdd(cantidad) {
    setStock(stock - cantidad);
    setAgregado("agregado");
    addToCart({ ...producto, cantidad: cantidad });
  }

  return (
    <>
      <div className="row text-center">
        <div className="col-1"></div>
        <div className="col-10">
          <div className="card text-white bg-dark border-light m-3 text-center">
            <div className="card-header text-center">
              <h3>{String(producto.categoria).toUpperCase()}</h3>
            </div>

            <h5 className="card-title">
              {String(producto.nombre).toUpperCase()}
            </h5>

            <div className="card-body">
              <Image
                src={require(`../../assets/images/huerta/${producto.categoria}/${producto.img}.jpg`)}
                width="200"
                height="200"
                alt=""
                rounded
              ></Image>
              <p className="card-text">Presentacion {producto.presentacion}</p>
            </div>

            <div className="card-footer">
              <p>
                Precio:{" "}
                <span>{parseFloat(String(producto.precio)).toFixed(2)}</span>
              </p>
              {agregado === "agregado" ? (
                <>
                  <Link to="/cart">
                    <button className="btn btn-warning btn-block m-3">
                      Terminar mi compra
                    </button>
                  </Link>
                  <Link to="/">
                    <button className="btn btn-primary btn-block m-3">
                      Seguir Comprando
                    </button>
                  </Link>
                </>
              ) : (
                <ItemCount stock={stock} inicial="1" onAdd={onAdd} />
              )}
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </>
  );
};

export default ItemDetail;
