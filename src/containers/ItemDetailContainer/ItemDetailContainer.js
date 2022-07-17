import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const queryProducto = doc(db, "productos", id);
    getDoc(queryProducto)
      .then((resp) => setProducto({ id: resp.id, ...resp.data() }))
      .catch((error) => console.log(error))
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
      </div>
    </>
  );
};

export default ItemDetailContainer;
