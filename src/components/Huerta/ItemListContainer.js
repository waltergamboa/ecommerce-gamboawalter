import { useState } from "react";
import ItemCount from "../Carrito/ItemCount";
import "./ItemListContainer.css";

function ItemListContainer({ gretting }) {
  const [stock, setStock] = useState(12);

  function onAdd(cantidad) {
    setStock(stock - cantidad);
  }

  return (
    <>
      <div>
        <h2 className="titulo">{gretting}</h2>
        <ItemCount stock={stock} inicial="1" onAdd={onAdd} />
      </div>
    </>
  );
}

export default ItemListContainer;
