import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function SideNavBar() {
  return (
    <div className='bg-body-tertiary p-2' style={{ height: '100vh', position: 'fixed', width: '250px', flexDirection: 'column', backgroundColor: '#f8f9fa' }}>
      <Navbar expand="sm" className='d-flex flex-column'>
        <div className='d-flex'>
            <Navbar.Brand className='text-center' href="/">BiblioManager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link href="/">Inicio</Nav.Link>
            </Nav.Item>
            
            <NavDropdown title="Gestão Literaria" id="basic-nav-dropdown">
              <NavDropdown.Item href="/livros">Livros</NavDropdown.Item>
              <NavDropdown.Item href="/generos">Generos</NavDropdown.Item>
              <NavDropdown.Item href="/autores">Autores</NavDropdown.Item>
              <NavDropdown.Item href="/editoras">Editoras</NavDropdown.Item>
            </NavDropdown>
            
            <NavDropdown title="Gestão Bibliotecaria" id="basic-nav-dropdown">
              <NavDropdown.Item href="/estoque">Estoque</NavDropdown.Item>
              <NavDropdown.Item href="/clientes">Clientes</NavDropdown.Item>
              <NavDropdown.Item href="/emprestimos">Emprestimos</NavDropdown.Item>
            </NavDropdown>
            
            {/* <Nav.Item>
              <Nav.Link href="/">Configurações</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/">Sair</Nav.Link>
            </Nav.Item> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default SideNavBar;