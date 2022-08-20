import axios from "axios";

const API_URL = "/api/accountinfos/";

//Create new accountinfo
const createAccountinfo = async (accountinfoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, accountinfoData, config);
  return response.data;
};

//Get user accountinfo
const getAccountinfos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

//Delete user accountinfo
const deleteAccountinfo = async (accountinfoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + accountinfoId, config);
  return response.data;
};
const accountinfoService = {
  createAccountinfo,
  getAccountinfos,
  deleteAccountinfo,
};
export default accountinfoService;
