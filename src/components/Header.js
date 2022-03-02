import * as React from "react";

import { Navbar, Nav, Container, Image, Row, Col } from "react-bootstrap";

import logo from "../assets/logo.svg";
import styles from "../styles/App.module.css";

const Header = () => {
  return (
    <Navbar expand="lg" className={`${styles["navbar"]} mb-5`}>
      <Container>
        <Navbar.Brand href="#home">
          <Row className="align-items-baseline g-1">
            <Col>
              <Image src={logo} className={`${styles["navbar-logo"]} border-end`}/>
            </Col>
            <Col>
              <span className={`text-white`}>Status</span>
            </Col>
          </Row>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {/* <Nav.Link href="#home" className={`text-white`}>Contact</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
