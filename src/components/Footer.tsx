import setThemeValue from "../helpers/helpers";

import { COPYRIGHT } from "../config";
import { THEME, TENANTS } from "../config";
import styles from "../styles/App.module.css";
import FooterLogo from "../assets/FooterLogo";
import { Container, Row, Col, Nav } from 'react-bootstrap';

const Footer = () => {
  setThemeValue(
    "footer-gradient-color-start",
    THEME["footer-gradient-color-start"],
  );
  setThemeValue(
    "footer-gradient-color-end",
    THEME["footer-gradient-color-end"],
  );
  setThemeValue(
    "footer-copyright-text-color",
    THEME["footer-copyright-text-color"],
  );
  let tenantName;
  let tenantLink;
  const currentURL = window.location.href;
  if (currentURL.includes("eosc")) {
    tenantName = "EOSC"
    tenantLink = TENANTS["EOSC"];
  }
  else if (currentURL.includes("eudat")) {
    tenantName = "EUDAT"
    tenantLink = TENANTS["EUDAT"];
  }
  else {
    tenantName = "Unknown"
    tenantLink = TENANTS["UNKNOWN"];
  }

  return (
    <footer className={`${styles["footer"]} mt-auto`}>
      <Container >
        <Row>
          <Col xs={4} sm={3} md={2} lg={2} xl={2}>
            <FooterLogo className={`${styles["footer-logo"]}`} />
          </Col>
          <Col>
            <Row className={`${styles["footer-links"]} justify-content-start  `}>
              <Nav.Link href="/about" className="mt-2 ">About</Nav.Link>
              <Nav.Link href={tenantLink} className="mb-1">{tenantName}</Nav.Link>
            </Row>
          </Col>
          <Col >
            <div className={`${styles["copyright"]}`}>
              <span>{COPYRIGHT}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
