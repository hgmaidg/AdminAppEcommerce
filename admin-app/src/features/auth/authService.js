// import axios from "axios";
// import { base_url } from "../../utils/base_url";

// const login = async (userData) => {
//   const reponse = await axios.post(`${base_url}user/login`, userData);
//   if (reponse.data) {
//     localStorage.setItem("user", JSON.stringify(reponse.data));
//   }
//   return reponse.data;
// };
// const getOrders = async () => {
//   const response = await axios.get(`${base_url}user/getallorders`, config);

//   return response.data;
// };
// const getTokenFromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;
// const config = {
//   headers: {
//     Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
//     Accept: "application/json",
//   },
// };
// const getOrder = async (id) => {
//   const response = await axios.post(
//     `${base_url}user/getorderbyuser/${id}`,
//     "",
//     config
//   );
//   return response.data;
// };

// const authService = {
//   login,
//   getOrders,
//   getOrder,
// };

// export default authService;

import axios from "axios";
import { base_url } from "../../utils/base_url";

const getTokenFromLocalStorage = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const config = () => ({
  headers: {
    Authorization: getTokenFromLocalStorage
      ? `Bearer ${getTokenFromLocalStorage().token}`
      : null,
    Accept: "application/json",
  },
});

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/orders`, config());
  return response.data;
};

// const getOrder = async (id) => {
//   const response = await axios.get(
//     `${base_url}user/getorderbyuser/${id}`,
//     "",
//     config()
//   );
//   return response.data;
// };

const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getOrder/${id}`,

    config()
  );
  return response.data;
};
// const updateOrder = async (data) => {
//   const response = await axios.put(
//     `${base_url}user/updateOrder/${data.id}`,
//     { status: data?.status },
//     config()
//   );
//   return response.data;
// };

const getMonthlyOrders = async () => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    config()
  );
  return response.data;
};

const getYearlyStats = async () => {
  const response = await axios.get(`${base_url}user/getyearlyorders`, config());
  return response.data;
};

const udpateOrder = async (order) => {
  const response = await axios.put(
    `${base_url}user/orders/${order.id}`,
    { orderStatus: order.orderData },
    config()
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getYearlyStats,
  getMonthlyOrders,
  udpateOrder,
};

export default authService;
