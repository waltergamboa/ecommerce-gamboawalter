import Image from "react-bootstrap/Image";

const ItemDetail = ({ producto }) => {
  return (
    <>
      <div className="col-5">
        <div className="card text-white bg-dark border-light  m-3">
          <div className="card-header">{producto.categoria}</div>

          <div className="card-body">
            <Image
              src={producto.img}
              width="200"
              height="200"
              alt=""
              rounded
            ></Image>
            <p className="card-text">{producto.nombre}</p>
            <p className="card-text">Presentacion {producto.presentacion}</p>
          </div>

          <div className="card-footer">
            <p>
              Precio <span>{producto.precio}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
