import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFetch } from "../../helpers/getFetch";
import ItemDetail from "../../components/ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getFetch(id)
      .then((response) => {
        if (response) {
          setProducto(response);
        } else {
          setProducto({});
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setCargando(false));
  }, [producto, id]);
  return (
    <>
      <div>
        {cargando ? (
          <h1>Buscando la información...</h1>
        ) : (
          <ItemDetail producto={producto} />
        )}
        {/* <ItemCount stock={stock} inicial="1" onAdd={onAdd} /> */}
      </div>
    </>
  );
};

export default ItemDetailContainer;
