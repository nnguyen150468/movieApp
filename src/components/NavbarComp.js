import React, {useState} from 'react'
import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'

export default function NavbarComp(props) {
    const [keyWord, setKeyWord] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        props.searchByKeyWord(keyWord);
    }

    return (
        <Navbar onSubmit={onSubmit} className="fixed-top" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home"><img border="0" height="40px" src="https://fontmeme.com/permalink/200322/c759b45177dedb749000426d3db679bd.png" alt="Nguyen2"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home" onClick={()=>props.PlayNowOrTopRated('now_playing')}>Currently Playing</Nav.Link>
            <Nav.Link href="#link"  onClick={()=>props.PlayNowOrTopRated('top_rated')}>Top Rated</Nav.Link>
            <NavDropdown title="Sort" id="basic-nav-dropdown">
              {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item> */}
              <NavDropdown.Item  href="#action/3.2"><a onClick={()=>props.mostToLeast('popularity')}>Most To Least Popular</a></NavDropdown.Item>
              <NavDropdown.Item  href="#action/3.3"><a onClick={()=>props.leastToMost('popularity')}>Least To Most Popular</a></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  href="#action/3.4"><a onClick={()=>props.mostToLeast('vote_average')}>Highest to Lowest Rating</a></NavDropdown.Item>
              <NavDropdown.Item  href="#action/3.5"><a onClick={()=>props.leastToMost('vote_average')}>Lowest to Highest Rating</a></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="input" onChange={e=>setKeyWord(e.target.value)} placeholder="Search" className="mr-sm-2" />
          </Form>
        </Navbar.Collapse>
      </Navbar>

    )
}
