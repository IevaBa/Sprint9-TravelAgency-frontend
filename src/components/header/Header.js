import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  function logout() {
    localStorage.clear();
    nav("/login");
  }

  return (
    <nav className="navbar bg-light border-bottom border-5  p-2 fs-4 ">
      <div className="nav-header bg-light">
        <ul className="header nav ">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "a nav-link active text-secondary fw-bold"
                  : "a nav-link text-secondary"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "a nav-link active text-secondary fw-bold"
                  : "a nav-link text-secondary"
              }
              to="/countries"
            >
              Countries
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "a nav-link active text-secondary fw-bold"
                  : "a nav-link text-secondary"
              }
              to="/hotels"
            >
              Hotels
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "a nav-link active text-secondary fw-bold"
                  : "a nav-link text-secondary"
              }
              to="/customers"
            >
              Customers
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="d-flex px-1">
        <ul className="header nav">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "a nav-link active text-secondary fw-bold"
                  : "a nav-link text-secondary"
              }
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "a nav-link active text-secondary fw-bold"
                  : "a nav-link text-secondary"
              }
              to="/register"
            >
              Register
            </NavLink>
          </li>
          <li className="text-center">
            <button className="btn btn-secondary" onClick={logout}>
              Lougout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
