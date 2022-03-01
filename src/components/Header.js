import * as React from "react";

import { Navbar, Nav, Container, Image, Row, Col } from "react-bootstrap";

import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-5">
      <Container>
        <Navbar.Brand href="#home">
          <Row className="align-items-baseline g-1">
            <Col>
              <Image fluid src={logo} className="border-end" />
            </Col>
            <Col>
              <span>Status</span>
            </Col>
          </Row>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#home">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
