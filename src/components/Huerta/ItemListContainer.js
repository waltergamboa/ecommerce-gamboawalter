import { useState, useEffect } from "react";
import { getFetch } from "../Helpers/getFetch";
import ItemCount from "../Carrito/ItemCount";
import "./ItemListContainer.css";
import ItemList from "./ItemList";

function ItemListContainer({ gretting }) {
  const [stock, setStock] = useState(12);

  function onAdd(cantidad) {
    setStock(stock - cantidad);
  }

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getFetch()
      .then((resp) => {
        setProductos(resp);
      })
      .catch((err) => console.log(err))
      .finally(() => setCargando(false));
  }, []);

  return (
    <>
      <div>
        <h2 className="titulo">{gretting}</h2>
        <ItemCount stock={stock} inicial="1" onAdd={onAdd} />
        {cargando ? (
          <h1>Buscando la información...</h1>
        ) : (
          <ItemList productos={productos} />
        )}
      </div>
    </>
  );
}

export default ItemListContainer;
