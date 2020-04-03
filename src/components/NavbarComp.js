import React, {useState} from 'react'
import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'

export default function NavbarComp(props) {
    const [keyWord, setKeyWord] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        props.searchByKeyWord(keyWord);
    }

    return (
        <Navbar onSubmit={onSubmit} className="fixed-top" style={{backgroundColor:"black"}} variant="dark" expand="lg">
        <Navbar.Brand href="#home"><img border="0" height="40px" src="https://fontmeme.com/permalink/200322/c759b45177dedb749000426d3db679bd.png" alt="Nguyen2"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="nav-link" href="#home" onClick={()=>props.PlayNowOrTopRated('now_playing')}>Currently Playing</Nav.Link>
            <Nav.Link className="nav-link" href="#link"  onClick={()=>props.PlayNowOrTopRated('top_rated')}>Top Rated</Nav.Link>
            <NavDropdown title="Sort" id="basic-nav-dropdown">
              {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item> */}
              <NavDropdown.Item  href="#action/3.2" onClick={()=>props.mostToLeast('popularity')}>Most To Least Popular</NavDropdown.Item>
              <NavDropdown.Item  href="#action/3.3" onClick={()=>props.leastToMost('popularity')}>Least To Most Popular</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  href="#action/3.4" onClick={()=>props.mostToLeast('vote_average')}>Highest to Lowest Rating</NavDropdown.Item>
              <NavDropdown.Item  href="#action/3.5" onClick={()=>props.leastToMost('vote_average')}>Lowest to Highest Rating</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="input" onChange={e=>setKeyWord(e.target.value)} placeholder="Search" className="mr-sm-2" />
          </Form>
        </Navbar.Collapse>
      </Navbar>

    )
}
