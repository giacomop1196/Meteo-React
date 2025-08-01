import { Container, Form, Nav, Button, Navbar, NavDropdown } from "react-bootstrap"
import { Link, useLocation } from 'react-router-dom'

const MeteoNavbar = ({ onLanguageChange }) => {

  const location = useLocation()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>Meteo Epicode</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }} navbarScroll>
            <Link className={location.pathname === '/' ? 'nav-link active' : 'nav-link'} to="/"> Home </Link>

            <Nav.Link>Previsioni</Nav.Link>
            
            <NavDropdown title="Lingua" id="language-dropdown">
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <NavDropdown.Item onClick={() => onLanguageChange('en')}>
                  <span role="img" aria-label="UK flag">🇬🇧</span> English (EN)
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onLanguageChange('it')}>
                  <span role="img" aria-label="Italy flag">🇮🇹</span> Italiano (IT)
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onLanguageChange('es')}>
                  <span role="img" aria-label="Spain flag">🇪🇸</span> Español (ES)
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onLanguageChange('fr')}>
                  <span role="img" aria-label="France flag">🇫🇷</span> Français (FR)
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onLanguageChange('de')}>
                  <span role="img" aria-label="Germany flag">🇩🇪</span> Deutsch (DE)
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onLanguageChange('ja')}>
                  <span role="img" aria-label="Japan flag">🇯🇵</span> 日本語 (JP)
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onLanguageChange('zh_tw')}>
                  <span role="img" aria-label="China flag">🇨🇳</span> 中文 (CN)
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onLanguageChange('ru')}>
                  <span role="img" aria-label="Russia flag">🇷🇺</span> Русский (RU)
                </NavDropdown.Item>
              </div>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Nome Città"
              className="me-2"
              aria-label="Search" />
            <Button variant="outline-success" type="submit">Cerca</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MeteoNavbar