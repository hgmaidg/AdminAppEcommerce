import axios from "axios";
import { base_url } from "../../utils/base_url";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
    Accept: "application/json",
  },
};
const login = async (userData) => {
  const reponse = await axios.post(`${base_url}user/login`, userData);
  if (reponse.data) {
    localStorage.setItem("user", JSON.stringify(reponse.data));
  }
  return reponse.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;
