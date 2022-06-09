import Image from "react-bootstrap/Image";

function Item({ id, nombre, categoria, img }) {
  return (
    <div className="col-3" key={id}>
      <div
        className="card text-white bg-dark border-light w-120 m-3"
      >
        <div className="card-header">{categoria.toUpperCase()}</div>

        <div className="card-body">
          <Image src={img} width="200" height="200" alt="" rounded></Image>
          <p className="card-text">{nombre}</p>
        </div>

        <div className="card-footer">
          <button className="btn btn-primary">Detalle del producto</button>
        </div>
      </div>
    </div>
  );
}

export default Item;
