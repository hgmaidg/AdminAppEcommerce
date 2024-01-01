import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";

import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  createCategory,
  getAProductCategory,
  resetState,
  updateAProductCategory,
  getCategories,
  deleteAProductCategory,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";
import Popup from "../components/PopupCategory";
let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Addcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const getPCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.pCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const showEditModal = (e) => {
    setOpenPopup(true);
    setpCatId(e);
  };
  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getAProductCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId]);
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfullly!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category Updated Successfullly!");
      navigate("/admin/add-category");
    }

    // if (isError) {
    //   toast.error("Something Went Wrong!");
    // }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // if (getPCatId !== undefined) {
      //   const data = { id: getPCatId, pCatData: values };
      //   dispatch(updateAProductCategory(data));
      //   dispatch(resetState());
      // } else {
      {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(getCategories());
          dispatch(resetState());
        }, 100);
        // if (isSuccess && createdCategory) {
        //   toast.success("Brand Added Successfullly!");
        // }
        // dispatch(getBrands());
        // if (isSuccess && updatedBrand) {
        //   toast.success("Brand Updated Successfullly!");
        //   navigate("/admin/add-brand");
        // }

        // if (isError) {
        //   toast.error("Something Went Wrong!");
        // }
      }
    },
  });
  const pCatStat = useSelector((state) => state.pCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCatStat.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatStat[i].title,
      action: (
        <>
          {/* <Link
            to={`/admin/category/${pCatStat[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link> */}
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              // showEditModal(`${brandState[i]._id}`);
              navigate(`/admin/category/${pCatStat[i]._id}`);
              showEditModal(`${pCatStat[i]._id}`);
            }}
          >
            <BiEdit />
          </button>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(pCatStat[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const editPCategory = (e) => {
    dispatch(updateAProductCategory(e));
    setOpen(false);
  };
  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4  title">
        {/* {getPCatId !== undefined ? "Edit" : "Add"} Category */}
        Add Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
            onChg={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="pcategory"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {/* {getPCatId !== undefined ? "Edit" : "Add"} Category */}
            Add Category
          </button>
        </form>
      </div>
      <div>
        <h3 className="mb-4 title">Product Categories</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteCategory(pCatId);
          }}
          title="Are you sure you want to delete this Product Category?"
        />
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title="Edit Product Category"
          performAction={() => {
            editPCategory(pCatId);
          }}
        ></Popup>
      </div>
    </div>
  );
};

export default Addcat;
