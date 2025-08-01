import { Container, Form, Nav, Button, Navbar, NavDropdown } from "react-bootstrap"
import { Link, useLocation } from 'react-router-dom'

const MeteoNavbar = () => {

  const location = useLocation()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>Meteo Epicode</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link className={location.pathname === '/' ? 'nav-link active' : 'nav-link'} to="/"> Home </Link>
            <Nav.Link>Previsioni</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Nome Città"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" type="submit">Cerca</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MeteoNavbar