import { useState, useEffect } from "react";
import "./ItemListContainer.css";
import ItemList from "../../components/ItemList/ItemList";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";

function ItemListContainer({ gretting }) {
  const { categoriaId } = useParams();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const aEjecutar = categoriaId
      ? query(
          collection(db, "productos"),
          where("categoria", "==", categoriaId),
          orderBy("nombre", "asc")
        )
      : query(collection(db, "productos"), orderBy("categoria", "asc"));

    getDocs(aEjecutar)
      .then((dataRes) =>
        setProductos(
          dataRes.docs.map((item) => ({ id: item.id, ...item.data() }))
        )
      )
      .catch((error) => console.log(error))
      .finally(() => setCargando(false));
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
