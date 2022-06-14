import { useState, useEffect } from "react";
import { getFetch } from "../Helpers/getFetch";
import ItemDetail from "../ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState({});
  useEffect(() => {
    getFetch(1)
      .then((response) => setProducto(response))
      .catch((err) => console.log(err));
  }, []);
  return <ItemDetail producto={producto} />;
};

export default ItemDetailContainer;
