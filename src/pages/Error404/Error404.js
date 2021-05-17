import React from "react";
import img from "public/not-found.png";

function Error404() {
  return (
    <React.Fragment>
      <div className="d-flex flex-column align-items-center">
        <h1 style={{ fontSize: "3.5rem" }}>404 Not Found</h1>
        <img src={img} alt="sad pokemon" style={{ maxWidth: "13%" }} />
      </div>
    </React.Fragment>
  );
}

export default Error404;
