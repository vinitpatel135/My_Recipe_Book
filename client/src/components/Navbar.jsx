import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Popover, Button } from "antd";
import { useCookies } from "react-cookie";
import { MenuFoldOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import logo from "../../public/assets/logo.svg";
import "../styles/navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const userName = currentUser.data.data.user.username;
  const userEmail = currentUser.data.data.user.email;

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth/login");
  };

  const content = (
    <div style={{ width: 200 }}>
      <p style={{ fontWeight: 500 }}>Email: {userEmail}</p>
      <Button type="primary" block onClick={logout} style={{ marginTop: 10 }}>
        Logout
      </Button>
    </div>
  );

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className={`navbarContainer ${showMenu ? "showMenu" : ""}`}>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="hamburgerIcon" onClick={toggleMenu}>
          {showMenu ? <CloseOutlined className="closeIcon" /> : <MenuFoldOutlined className="menuIcon" />}
        </div>
        <div className={`menuItems ${showMenu ? "show" : ""}`}>
          <Link to="/" className="navLink">Home</Link>
          <Link to="/create-recipe" className="navLink">Create Recipes</Link>
          <Link to="/saved-recipes" className="navLink">Saved Recipes</Link>
          <Link to="/my-recipes" className="navLink">My Recipes</Link>
        </div>
        <div className="userProfile">
          <Popover content={content} title={userName}>
            <span className="userName">
              <UserOutlined /> {userName}
            </span>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
