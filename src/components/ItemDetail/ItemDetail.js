import Image from "react-bootstrap/Image";

const ItemDetail = ({ producto }) => {
  return (
    <>
      <div className="row text-center">
        <div className="col-4"></div>
        <div className="col-6 p-3">
          <div
            className="card text-white bg-dark border-light m-3"
            style={{ width: "50%" }}
          >
            <div className="card-header text-center">
              <h3>{String(producto.categoria).toUpperCase()}</h3>
            </div>

            <h5 className="card-title">
              {String(producto.nombre).toUpperCase()}
            </h5>

            <div className="card-body">
              <Image
                src={producto.img}
                width="200"
                height="200"
                alt=""
                rounded
              ></Image>
              <p className="card-text">Presentacion {producto.presentacion}</p>
            </div>

            <div className="card-footer">
              <p>
                Precio: <span>{parseFloat(String(producto.precio)).toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
};

export default ItemDetail;
