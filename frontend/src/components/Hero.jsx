
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Hero = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(to right, skyblue, pink)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "black", fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}>
        Welcome to Task Management System
      </h1>
      <p style={{ color: "black", fontSize: "1.2rem", marginBottom: "30px" }}>
        Organize your tasks efficiently and boost your productivity!
      </p>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        <Button variant="warning" style={{ color: "black", padding: "10px 20px", fontSize: "1rem", borderRadius: "50px" }}>
          Get Started
        </Button>
        <Button variant="light" style={{ color: "black", padding: "10px 20px", fontSize: "1rem", borderRadius: "50px" }}>
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default Hero;
