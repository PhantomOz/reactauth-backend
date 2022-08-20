import axios from "axios";

const API_URL = "/api/accounts/";

//Create new accountinfo
const createAccountInfo = async (text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(text);
  const response = await axios.post(API_URL, text, config);
  console.log(response);
  return response.data;
};

//Get user accountinfo
const getAccountInfo = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

//Delete user accountinfo
const deleteAccountInfo = async (accountinfoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + accountinfoId, config);
  return response.data;
};
const accountInfoService = {
  createAccountInfo,
  getAccountInfo,
  deleteAccountInfo,
};
export default accountInfoService;
