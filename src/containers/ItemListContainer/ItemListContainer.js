import { useState, useEffect } from "react";
import { getFetch } from "../../helpers/getFetch";
import "./ItemListContainer.css";
import ItemList from "../../components/ItemList/ItemList";
import { useParams } from "react-router-dom";

function ItemListContainer({ gretting }) {


  const { categoriaId } = useParams();


  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (categoriaId) {
      getFetch()
        .then((resp) => {
          let tmp = resp.filter(
            (productos) => productos.categoria === categoriaId
          );
          if (tmp) setProductos(tmp);
          else {
            setProductos([]);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setCargando(false));
    } else {
      getFetch()
        .then((resp) => {
          setProductos(resp);
        })
        .catch((err) => console.log(err))
        .finally(() => setCargando(false));
    }
  }, [productos, categoriaId]);

  return (
    <>
      <h2 className="titulo">{gretting}</h2>
      <div>
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
