import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./Footer.module.css";
import mern from "../images/mern.png";
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
  return (
    <footer className={`${styles.footer} mt-auto py-3 bg-dark text-white`}>
      <Container>
        <Row>
          <Col xs={12} md={4} className="text-center text-lg-start" id="darrenk">© 2024<a
              href="https://darrenk.uk/"
              target="_blank"
              className="text-white ms-2"
              rel="noreferrer"
            >Darren K</a></Col>
          <Col xs={12} md={4} className="text-center">
            <img src={mern} className="mern" alt="MERN Stack"/>
            <p className="center">Built using the M.E.R.N Stack</p>
          </Col>
          <Col xs={12} md={4} className="text-center text-lg-end">
            <SocialIcon fgColor="#f0db4f" bgColor="#000" rel="noreferrer" network="github"  target="_blank" url="https://github.com/kandekore"/>
            <SocialIcon fgColor="#f0db4f" bgColor="#000" rel="noreferrer" network="x"  target="_blank" url="https://x.com/kandekore"/>
            <SocialIcon fgColor="#f0db4f" bgColor="#000" rel="noreferrer" network="linkedin"  target="_blank" url="https://www.linkedin.com/in/dkandekore"/>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
