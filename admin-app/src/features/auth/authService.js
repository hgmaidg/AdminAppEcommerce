import axios from "axios";
import { base_url } from "../../utils/base_url";

const login = async (userData) => {
  const reponse = await axios.post(`${base_url}user/login`, userData);
  if (reponse.data) {
    localStorage.setItem("user", JSON.stringify(reponse.data));
  }
  return reponse.data;
};

const authService = {
  login,
};

export default authService;
