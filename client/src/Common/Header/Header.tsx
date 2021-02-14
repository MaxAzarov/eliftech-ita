import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link to="/bank-creation" style={{ color: "#000" }}>
        Bank creation
      </Link>
      <Link to="/banks" style={{ color: "#000" }}>
        Banks
      </Link>
      <Link to="/mortgage" style={{ color: "#000" }}>
        Mortgage
      </Link>
    </header>
  );
};
export default Header;
