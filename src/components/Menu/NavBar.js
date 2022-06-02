import logo from "../../assets/images/logo.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import CartWidget from "../CarritoImage/CartWidget";
import "./NavBar.css";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#inicio">
          <Image
            src={logo}
            alt="De la Huerta a tu Mesa"
            width="100"
            height="70"
            className="d-inline-block align-center"
          ></Image>{" "}
          De la Huerta a tu Mesa
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Huerta" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#frutas">Frutas</NavDropdown.Item>
              <NavDropdown.Item href="#vegetales">Vegetales</NavDropdown.Item>
              <NavDropdown.Item href="#gourmet">Gourmet</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#todos">
                Todos los productos
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#carrito">Carrito</Nav.Link>
          </Nav>
          <CartWidget />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
