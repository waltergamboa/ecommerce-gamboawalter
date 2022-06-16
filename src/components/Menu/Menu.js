import logo from "../../assets/images/logo.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import "./Menu.css";
import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CarritoImage/CartWidget";

function NavBar() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="menu-navbar-nav"
      >
        <Container>
          <Navbar.Brand>
            <NavLink to="/" className="nav-link">
              <Image
                src={logo}
                alt="De la Huerta a tu Mesa"
                width="100"
                height="70"
                className="d-inline-block align-center"
              ></Image>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Inicio
              </NavLink>

              <NavLink to="/categoria/frutas" className="nav-link">
                Frutas
              </NavLink>
              <NavLink to="/categoria/vegetales" className="nav-link">
                Vegetales
              </NavLink>
              <NavLink to="/categoria/gourmet" className="nav-link">
                Gourmet
              </NavLink>
            </Nav>
            <Link to="/cart">
              <CartWidget />
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
