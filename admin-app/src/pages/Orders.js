import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateAnOrder } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
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
    title: "Status",
    dataIndex: "orderStatus",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name:
        orderState[i].shippingInfo.firstName +
        " " +
        orderState[i].shippingInfo.lastName,
      product: (
        <Link to={`/admin/orders/${orderState[i]._id}`}>View Orders</Link>
      ),
      amount: orderState[i].totalPriceAfterDiscount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      orderStatus: (
        <>
          <select
            name=""
            defaultValue={
              orderState[i].orderStatus ? orderState[i].orderStatus : "Pending"
            }
            className="form-control form-select"
            id=""
            onChange={(e) => setOrderStatus(e.target.value, orderState[i]._id)}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipping">Shipping</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/orders/${orderState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          {/* <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link> */}
        </>
      ),
    });
  }

  const setOrderStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, orderData: e };
    dispatch(updateAnOrder(data));
  };
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
