import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { loginUser, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
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
    const userData = {
      email,
      password,
    };

    dispatch(loginUser(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login and start creating Account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
