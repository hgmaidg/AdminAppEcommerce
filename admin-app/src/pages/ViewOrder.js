import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getOrderByUser(userId));
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(getOrderByUser(userId));
        console.log("Fetched data:", result);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, [dispatch, userId]);
  console.log(userId);
  // const orderState = useSelector((state) => state.auth.user.orderItems);
  const orderState = useSelector((state) => state.auth?.orders?.orderItems);
  // console.log(
  //   "auth state:",
  //   useSelector((state) => state.auth)
  // );
  // console.log(
  //   "orders state:",
  //   useSelector((state) => state.auth?.orders)
  // );
  // console.log(
  //   "orderItems:",
  //   useSelector((state) => state.auth?.orders?.[0]?.orderItems)
  // );
  console.log("Order State:");
  console.log(orderState);
  const data1 = [];
  if (orderState && orderState.length) {
    for (let i = 0; i < orderState.length; i++) {
      data1.push({
        key: i + 1,
        // name: orderState[i].orderItems.title,
        // brand: orderState[i].orderItems.brand,
        // count: orderState[i].count,
        amount: orderState[i].totalPriceAfterDiscount,
        // color: orderState[i].orderItems.color,
        date: orderState[i].createdAt,
        action: (
          <>
            <Link to="/" className=" fs-3 text-danger">
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to="/">
              <AiFillDelete />
            </Link>
          </>
        ),
      });
    }
  }
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
