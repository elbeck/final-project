import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "public/logo.svg";
import routeMap from "route-map/route-map";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";

function CustomNavbar(props) {
  const [navExpanded, setNavExpanded] = useState(false);

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

  const clickHandler = (e) => {
    if (e.target.classList.contains("nav-link")) {
      setNavExpanded(false);
    }
  };

  let navLinks = links.map((link) => {
    return (
      <LinkContainer key={link.title} to={link.to} exact={link.exact}>
        <Nav.Link>{link.title}</Nav.Link>
      </LinkContainer>
    );
  });
  const { location } = props;
  return (
    <Navbar
      onToggle={(bool) => setNavExpanded(bool)}
      expanded={navExpanded}
      onClick={clickHandler}
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
        <Nav activeKey={location.pathname} className="mr-auto">
          {navLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(CustomNavbar);
