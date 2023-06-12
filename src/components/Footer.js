import React from "react";

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
      <p style={textStyle}>
          Website created by{" "}
          <a href="https://www.linkedin.com/in/jose-julian-hernandez-jara-8762b2238/">
            Jose Julian Hernandez Jara
          </a>
        </p>
      </div>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: "#f2f2f2",
  padding: "20px",
  textAlign: "center",
};

const contentStyle = {
  maxWidth: "800px",
  margin: "0 auto",
};

const textStyle = {
  fontSize: "14px",
  color: "#888888",
  margin: "5px",
};
