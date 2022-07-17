import { memo } from "react";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

const Item = memo(({ id, nombre, categoria, img, stock }) => {
  return (
    <div className="col-3" key={id}>
      <div className="card text-white bg-dark border-light w-120 m-3">
        <div className="card-header">{categoria.toUpperCase()}</div>

        <div className="card-body" style={{ textAlign: "center" }}>
          <Image
            src={img}
            width="200"
            height="200"
            alt=""
            rounded="true"
          ></Image>
          <p className="card-text">
            {nombre.toUpperCase()}
            {stock <= 0 ? <span> - (Sin Stock)</span> : ""}
          </p>
        </div>

        <div className="card-footer" style={{ textAlign: "right" }}>
          <Link to={`/detalle/${id}`}>
            <button className="btn btn-primary btn-block">
              Detalle del producto
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Item;
