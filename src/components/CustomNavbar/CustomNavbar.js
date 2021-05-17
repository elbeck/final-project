import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "public/logo.svg";
import routeMap from "route-map/route-map";
import { LinkContainer } from "react-router-bootstrap";

function CustomNavbar() {
  const links = [
    {
      to: routeMap.home.path,
      title: "Home",
      exact: routeMap.home.exact,
    },
    {
      to: routeMap.collection.path,
      title: "Collection",
      exact: routeMap.collection.exact,
    },
  ];

  let navLinks = links.map((link) => {
    return (
      <LinkContainer key={link.title} to={link.to} exact={link.exact}>
        <Nav.Link href={link.to}>{link.title}</Nav.Link>
      </LinkContainer>
    );
  });
  return (
    <Navbar
      className="fixed-top"
      bg="light"
      variant="dark"
      expand="lg"
      style={{ fontWeight: 500 }}
    >
      <Navbar.Brand href="/">
        <img
          alt=""
          src={logo}
          height="30"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">{navLinks}</Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-white">Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
