import React from "react";
import img from "public/not-found.png";
import { Container } from "react-bootstrap";

function Error404() {
  return (
    <div>
      <Container className="d-flex flex-column align-items-center mt-4 mb-0">
        <h1 style={{ fontSize: "3.5rem" }}>404 Not Found</h1>
        <img src={img} alt="sad pokemon" style={{ maxWidth: "13%" }} />
      </Container>
    </div>
  );
}

export default Error404;
