import { memo } from "react";
import Item from "../Item/Item";

const ItemList = memo(({ productos }) => {
  return (
    <div className="row">
      {productos.map((producto) => (
        <Item
          id={producto.id}
          nombre={producto.nombre}
          categoria={producto.categoria}
          img={require(`../../assets/images/huerta/${producto.categoria}/${producto.img}.jpg`)}
        />
      ))}
    </div>
  );
});

export default ItemList;
