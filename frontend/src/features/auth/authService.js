import axios from "axios";

const API_URL = "/api/users/";

// Post Request For Registering Users
const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Post Request For Logging in Users
const loginUser = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// To LogOut Users
const logoutUser = () => {
  localStorage.removeItem("user");
};

const authService = {
  registerUser,
  loginUser,
  logoutUser,
};

export default authService;
