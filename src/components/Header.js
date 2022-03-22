import * as React from "react";
import setThemeValue from "../helpers/helpers";

import { Navbar, Nav, Container, Image, Row, Col } from "react-bootstrap";

import themes from "../themes.json";
import logo from "../assets/logo.svg";
import styles from "../styles/App.module.css";

const Header = () => {

  setThemeValue("header-gradient-color-start", themes["default"]["header-gradient-color-start"]);
  setThemeValue("header-gradient-color-end", themes["default"]["header-gradient-color-end"]);

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
