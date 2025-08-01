import { Container, Form, Nav, Button, Navbar, NavDropdown } from "react-bootstrap"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react';

const MeteoNavbar = ({ onLanguageChange }) => {

  const location = useLocation()
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Previene il comportamento di default del form (ricaricare la pagina)
    if (searchQuery.trim() !== '') {
      // Naviga alla pagina di dettaglio con la query di ricerca
      // Potresti passare l'ID o il nome della città, a seconda di come costruirai la Detail page
      // Per semplicità, useremo il nome della città nella URL
      navigate(`/detail/name/${searchQuery.trim()}`); // Naviga a /detail/name/NomeCitta
      setSearchQuery(''); // Pulisce l'input dopo la ricerca
    }
  };

  return (
    <Navbar expand="lg" className="navbar-color" >
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }} navbarScroll>

            <Link className={location.pathname === '/' ? 'nav-link active' : 'nav-link'} to="/"><i className="bi bi-cloud-sun mx-auto"></i> Home </Link>

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
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nome Città"
              className="me-2"
              aria-label="Search" />
            <Button variant="light" type="submit">Cerca</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MeteoNavbar