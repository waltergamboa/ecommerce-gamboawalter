import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Menu/Menu";
import ItemListContainer from "./containers/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./containers/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            index
            path="/"
            element={
              <ItemListContainer gretting="Bienvenido y esperamos que les gusten nuestros productos!!!" />
            }
          />
          <Route
            index
            path="/categoria/:categoriaId"
            element={
              <ItemListContainer gretting="Bienvenido y esperamos que les gusten nuestros productos!!!" />
            }
          />
          <Route path="/detalle/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
