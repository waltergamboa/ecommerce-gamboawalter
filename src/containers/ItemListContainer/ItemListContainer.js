import { useState, useEffect } from "react";
import "./ItemListContainer.css";
import ItemList from "../../components/ItemList/ItemList";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

function ItemListContainer({ gretting }) {
  const { categoriaId } = useParams();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const queryProductos = collection(db, "productos");
    if (categoriaId) {
      const queryProductosFilter = query(
        queryProductos,
        where("categoria", "==", categoriaId)
      );
      getDocs(queryProductosFilter)
        .then((dataRes) =>
          setProductos(
            dataRes.docs.map((item) => ({ id: item.id, ...item.data() }))
          )
        )
        .catch((error) => console.log(error))
        .finally(() => setCargando(false));
    } else {
      getDocs(queryProductos)
        .then((dataRes) =>
          setProductos(
            dataRes.docs.map((item) => ({ id: item.id, ...item.data() }))
          )
        )
        .catch((error) => console.log(error))
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
