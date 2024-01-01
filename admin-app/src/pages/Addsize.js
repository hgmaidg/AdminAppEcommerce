import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createSize,
  getASize,
  resetState,
  updateASize,
} from "../features/size/sizeSlice";
import { deleteASize, getSizes } from "../features/size/sizeSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { Table } from "antd";
import Popup from "../components/PopupSize";

let schema = yup.object().shape({
  title: yup.string().required("Size is Required"),
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

const Addsize = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [sizeId, setsizeId] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const getSizeId = location.pathname.split("/")[3];
  const newSize = useSelector((state) => state.size);
  const { isSuccess, isError, isLoading, createdSize, updatedSize, sizeName } =
    newSize;
  const showModal = (e) => {
    setOpen(true);
    setsizeId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const showEditModal = (e) => {
    setOpenPopup(true);
    setsizeId(e);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getSizes());
  }, []);
  useEffect(() => {
    if (getSizeId !== undefined) {
      dispatch(getASize(getSizeId));
    } else {
      dispatch(resetState());
    }
  }, [getSizeId]);
  useEffect(() => {
    if (isSuccess && createdSize) {
      toast.success("Size Added Successfullly!");
    }
    if (isSuccess && updatedSize) {
      toast.success("Size Updated Successfullly!");
      navigate("/admin/add-size");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdSize]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: sizeName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // if (getSizeId !== undefined) {
      //   const data = { id: getSizeId, sizeData: values };
      //   dispatch(updateASize(data));
      //   dispatch(resetState());
      // } else {
      //   dispatch(createSize(values));
      //   formik.resetForm();
      //   setTimeout(() => {
      //     dispatch(resetState());
      //   }, 300);
      // }
      dispatch(createSize(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(getSizes());
        dispatch(resetState());
      }, 100);
    },
  });

  const sizeState = useSelector((state) => state.size.sizes);
  const data1 = [];
  for (let i = 0; i < sizeState.length; i++) {
    data1.push({
      key: i + 1,
      name: sizeState[i].title,
      action: (
        <>
          {/* <Link
            to={`/admin/size/${sizeState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link> */}
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              // showEditModal(`${brandState[i]._id}`);
              navigate(`/admin/size/${sizeState[i]._id}`);
              showEditModal(`${sizeState[i]._id}`);
            }}
          >
            <BiEdit />
          </button>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(sizeState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const editSize = (e) => {
    dispatch(updateASize(e));
    setOpen(false);
  };
  const deleteSize = (e) => {
    dispatch(deleteASize(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getSizes());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">
        {/* {getSizeId !== undefined ? "Edit" : "Add"} Size */}
        Add Size
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="number"
            label="Enter Product Size"
            onChg={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="size"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {/* {getSizeId !== undefined ? "Edit" : "Add"} Size */}
            Add Size
          </button>
        </form>
      </div>
      <div>
        <h3 className="mb-4 title">Sizes</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteSize(sizeId);
          }}
          title="Are you sure you want to delete this size?"
        />
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title="Edit Size"
          performAction={() => {
            editSize(sizeId);
          }}
        ></Popup>
      </div>
    </div>
  );
};

export default Addsize;
