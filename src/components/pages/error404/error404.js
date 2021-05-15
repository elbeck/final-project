import React from "react";
import img from "assets/054_psyduck.png";
import { Container } from "react-bootstrap";

function Error404() {
  return (
    <div>
      <Container className="d-flex flex-column align-items-center mt-4 mb-0">
        <h1 style={{ "font-size": "3.5rem" }}>404 Not Found</h1>
        <img src={img} alt="sad pokemon" style={{ "max-width": "13%" }} />
      </Container>
    </div>
  );
}

export default Error404;
