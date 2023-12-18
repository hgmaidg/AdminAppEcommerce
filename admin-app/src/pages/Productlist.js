import React from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
// import { FaRegEdit } from "react-icons/fa";
// import { AiOutlineDelete } from "react-icons/ai";
const columns = [
  {
    title: "SNo", //serial number
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Size",
    dataIndex: "size",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
function Productlist() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  console.log(productState);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    const colorTitles = productState[i].color?.map((color) => color.title);
    console.log(colorTitles);
    const sizeTitles = productState[i].size.map((size) => size.title);
    console.log(sizeTitles);
    if (colorTitles === undefined) {
      console.error(`Color is undefined for product at index ${i}`);
    } else {
      console.log(`Color titles for product at index ${i}:`, colorTitles);
    }
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: colorTitles.join(", "),
      size: sizeTitles.join(", "),

      price: `${productState[i].price}`,
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
  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Products List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
}

export default Productlist;
