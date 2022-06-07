import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Menu/NavBar";
import ItemListContainer from "./components/Huerta/ItemListContainer";

function App() {
  return (
    <>
      <NavBar />
      <div className="App">
        <header className="App-header">
        <ItemListContainer gretting="Bienvenido y esperamos que les gusten nuestros productos!!!" />          
        </header>
      </div>
    </>
  );
}

export default App;
