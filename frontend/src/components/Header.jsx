import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { logoutUser, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to={"/"}>Account Manager App</Link>
      </div>
      <ul>
        {!user ? (
          <>
            <li>
              <Link to={"/login"}>
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to={"/register"}>
                <FaUser />
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button className="btn" onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
