import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { registerUser, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      // toast.success(message);
      navigate("/");
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, message, navigate, user]);

  const handleChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(registerUser(userData));
    }
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please Create an Account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
