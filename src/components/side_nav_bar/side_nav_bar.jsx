import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function SideNavBar() {
  return (
    // <Navbar expand="lg" className="bg-body-tertiary" style={{ height: '100vh', position: 'fixed', width: '175px', flexDirection: 'column', backgroundColor: '#f8f9fa' }}>
    //   <Container className="d-flex flex-column">
    //     <Navbar.Brand href="/">BiblioManager</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="flex-column">
    //         <Nav.Link className='p-1' href="/generos">Generos</Nav.Link>
    //         <Nav.Link href="/autores">Autores</Nav.Link>
    //         {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
    //           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //           <NavDropdown.Divider />
    //           <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    //         </NavDropdown> */}
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
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
            
            <Nav.Item>
              <Nav.Link href="/">Configurações</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/">Sair</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default SideNavBar;