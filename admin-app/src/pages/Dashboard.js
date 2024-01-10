import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/charts";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getOrders,
  getYearlyData,
} from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo", //serial number
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product Count",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Total Price After Discount",
    dataIndex: "dprice",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  // const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  // const orderState = useSelector((state) => state?.auth?.orders.orders);
  // const [dataMonthly, setDataMonthly] = useState([]);
  // const [dataMonthlySales, setDataMonthlySales] = useState([]);
  // const [orderData, setOrderData] = useState([]);

  // useEffect(() => {
  //   dispatch(getMonthlyData());
  //   dispatch(getYearlyData());
  //   dispatch(getOrders());
  // }, []);

  // useEffect(() => {
  //   let monthNames = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   let data = [];
  //   let monthlyOrderCount = [];
  //   for (let index = 0; index < monthlyDataState?.length; index++) {
  //     const element = monthlyDataState[index];
  //     data.push({
  //       type: monthNames[element?._id?.month],
  //       income: element?.amount,
  //     });
  //     monthlyOrderCount.push({
  //       type: monthNames[element?._id?.month],
  //       sales: element?.count,
  //     });
  //   }
  //   setDataMonthly(data);
  //   setDataMonthlySales(monthlyOrderCount);
  //   const data1 = [];
  // });
  const dataOrder = [
    {
      type: "Jan",
      sales: 3,
    },
    {
      type: "Feb",
      sales: 5,
    },
    {
      type: "Mar",
      sales: 5,
    },
    {
      type: "Apr",
      sales: 10,
    },
    {
      type: "May",
      sales: 1,
    },
    {
      type: "Jun",
      sales: 2,
    },
    {
      type: "July",
      sales: 3,
    },
    {
      type: "Aug",
      sales: 9,
    },
    {
      type: "Sept",
      sales: 6,
    },
    {
      type: "Oct",
      sales: 2,
    },
    {
      type: "Nov",
      sales: 3,
    },
    {
      type: "Dec",
      sales: 6,
    },
  ];
  const dataIncome = [
    {
      type: "Jan",
      income: 350,
    },
    {
      type: "Feb",
      income: 354,
    },
    {
      type: "Mar",
      income: 276,
    },
    {
      type: "Apr",
      income: 550,
    },
    {
      type: "May",
      income: 120,
    },
    {
      type: "Jun",
      income: 330,
    },
    {
      type: "July",
      income: 520,
    },
    {
      type: "Aug",
      income: 900,
    },
    {
      type: "Sept",
      income: 339,
    },
    {
      type: "Oct",
      income: 270,
    },
    {
      type: "Nov",
      income: 455,
    },
    {
      type: "Dec",
      income: 120,
    },
  ];
  const totalIncome = dataIncome.reduce((acc, item) => acc + item.income, 0);
  const totalSales = dataOrder.reduce((acc, item) => acc + item.sales, 0);
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state.auth?.yearlyData);
  const orderState = useSelector((state) => state.auth?.orders);
  console.log(orderState);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const config3 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage ? getTokenFromLocalStorage.token : ""
      }`,
    },
    Accept: "application/json",
  };

  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
    dispatch(getOrders());
    // dispatch(getMonthlyData(config3));
    // dispatch(getYearlyData(config3));
    // dispatch(getOtherData(config3));
  }, []);
  console.log(monthlyDataState);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlyOrderCount = [];
    console.log(monthlyDataState);
    console.log(yearlyDataState);
    const data1 = monthlyDataState?.data;
    if (data1) {
      for (let index = 0; index < data1?.length; index++) {
        const element = data1[index];

        data.push({
          type: monthNames[element?._id?.month],
          // sales: element?.count,
          income: element?.amount,
        });
        monthlyOrderCount.push({
          type: monthNames[element?._id?.month],
          sales: element?.count,
        });
      }
    }
    console.log(data);
    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);

    const data2 = [];
    for (let i = 0; i < orderState?.length; i++) {
      data2.push({
        key: `${i + 1}`,
        name: `${orderState[i]?.shippingInfo?.firstName} ${orderState[i]?.shippingInfo?.lastName}`,
        product: orderState[i]?.orderItems?.length,
        price: `$${orderState[i]?.totalPrice}`,
        dprice: `$ ${orderState[i]?.totalPriceAfterDiscount}`,
        status: orderState[i]?.orderStatus,
      });
    }
    setOrderData(data2);
  }, [monthlyDataState]);

  const config = {
    data: dataIncome,
    xField: "type",
    yField: "income",
    // color: ({ type }) => {
    //   return "#000000";
    // },
    label: {
      position: "bottom",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const config2 = {
    data: dataOrder,
    xField: "type",
    yField: "sales",
    // color: ({ type }) => {
    //   return "#000000";
    // },
    label: {
      position: "bottom",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">
              {/* $ {yearlyDataState?.data && yearlyDataState?.data[0]?.amount} */}
              $ {totalIncome}
            </h4>
          </div>
          <div className="d-flex p-3 flex-column align-items-end">
            {/* <h6>
              <BsArrowDownRight /> 32%
            </h6> */}
            <p className="mb-0  desc">Incomes</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc ">Total Sales</p>
            <h4 className="mb-0 sub-title">
              {/* {yearlyDataState?.data && yearlyDataState?.data[0]?.count} */}
              {totalSales}
            </h4>
          </div>
          <div className="d-flex p-3 flex-column align-items-end">
            {/* <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6> */}
            <p className="mb-0  desc">Sales</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Sales Statics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
