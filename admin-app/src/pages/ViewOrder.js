import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import {
  getOrder,
  getOrderByUser,
  getOrders,
} from "../features/auth/authSlice";
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
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Size",
    dataIndex: "size",
  },

  // {
  //   title: "Action",
  //   dataIndex: "action",
  // },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getOrderByUser(userId));
  // }, []);
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await dispatch(getOrderByUser(userId));
  //       console.log("Fetched data:", result);
  //     } catch (error) {
  //       console.error("Error fetching order data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch, userId]);
  console.log(orderId);
  // const orderState = useSelector((state) => state.auth?.orders?.orderItems);
  const orderState = useSelector((state) => state?.auth?.singleorder);
  console.log("Order State:");
  console.log(orderState);
  const data1 = [];
  // if (orderState && orderState.length) {
  for (let i = 0; i < orderState?.orderItems.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product.title,
      brand: orderState?.orderItems[i]?.product.brand,
      count: orderState?.orderItems[i]?.quantity,
      price: orderState?.orderItems[i]?.price,
      color: orderState?.orderItems[i]?.color?.title,
      size: orderState?.orderItems[i]?.size?.title,
      // action: (
      //   <>
      //     <Link to="/" className=" fs-3 text-danger">
      //       <BiEdit />
      //     </Link>
      //     <Link className="ms-3 fs-3 text-danger" to="/">
      //       <AiFillDelete />
      //     </Link>
      //   </>
      // ),
    });
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
