import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createColor,
  getAColor,
  resetState,
  updateAColor,
  getColors,
  deleteAColor,
} from "../features/color/colorSlice";
import Popup from "../components/PopupColor";

import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

let schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});
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
    title: "Action",
    dataIndex: "action",
  },
];
const Addcolor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [colorId, setcolorId] = useState("");
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    updatedColor,
    colorName,
  } = newColor;
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);
  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfullly!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfullly!");
      navigate("/admin/add-color");
    }
    // if (isError) {
    //   toast.error("Something Went Wrong!");
    // }
  }, [isSuccess, isError, isLoading, createdColor]);

  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };
  const showEditModal = (e) => {
    setOpenPopup(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // if (getColorId !== undefined) {
      //   const data = { id: getColorId, colorData: values };
      //   dispatch(updateAColor(data));
      //   dispatch(resetState());
      // } else {
      dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(getColors());
        dispatch(resetState());
      }, 300);
      // }
    },
  });
  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      name: colorState[i].title,
      action: (
        <>
          {/* <Link
            to={`/admin/color/${colorState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link> */}
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              // showEditModal(`${brandState[i]._id}`);
              navigate(`/admin/color/${colorState[i]._id}`);
              showEditModal(`${colorState[i]._id}`);
            }}
          >
            <BiEdit />
          </button>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(colorState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const editColor = (e) => {
    dispatch(updateAColor(e));
    setOpen(false);
  };
  const deleteColor = (e) => {
    dispatch(deleteAColor(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">
        {/* {getColorId !== undefined ? "Edit" : "Add"} Color */}
        Add Color
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Color"
            onChg={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          {/* <CustomInput
            type="text"
            label="Enter Color Name"
            onChg={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          /> */}
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {/* {getColorId !== undefined ? "Edit" : "Add"} Color */}
            Add Color
          </button>
        </form>
      </div>
      <div>
        <h3 className="mb-4 title">Colors</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteColor(colorId);
          }}
          title="Are you sure you want to delete this color?"
        />
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title="Edit Color"
          performAction={() => {
            editColor(colorId);
          }}
        ></Popup>
      </div>
    </div>
  );
};

export default Addcolor;
