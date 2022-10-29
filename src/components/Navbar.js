
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';
import { useState,useEffect } from 'react';

function Header(props) {
  

  const token = localStorage.getItem('mytoken')
  const [user , setUser] = useState([])
  useEffect(() => {
    fetch('https://va-restapi.herokuapp.com/api/rest-auth/user/', {
          method:'GET',
              headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
              } 
        })
    .then(resp => resp.json())
    .then(result => setUser(result))    
  }, [token])
  return (
    <>
    {['sm'].map((expand) => (
      <Navbar style={{ height: '6vh' }} key={expand} bg="dark" variant="dark"expand={expand} className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Enzo Staffing</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              <Nav.Link>Home</Nav.Link>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {token ?
                <>
                {user.groups?.map(group=>
                <div key={group.id}>
                {group.name === 'admin'?
                <Nav.Link href="#action1">ADMIN</Nav.Link>
                :
                group.name === 'client' ?
                <Nav.Link href="#action1">Client</Nav.Link>
                :
                null
                }
                </div>  
                    
                    )}
                
                <Nav.Link href="#action1">Credits</Nav.Link>
                <Nav.Link href="#action2">Leaves</Nav.Link>
                <Nav.Link as={NavLink} to = {token ? '/users': '/'}>Users</Nav.Link>
                <Nav.Link as={NavLink} to = {token ? '/userlogs': '/'}>Logs</Nav.Link>
                <Nav.Link onClick= {() => localStorage.clear()} as={NavLink} href="#action2">Logout</Nav.Link>
                </>  
                :
                <>
                <Nav.Link href="#action2">Login</Nav.Link>
                <Nav.Link href="#action2">Register</Nav.Link>
                </>
                
              }
                
                
                
              </Nav>
             
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    ))}
  </>
  
  )
}

export default Header