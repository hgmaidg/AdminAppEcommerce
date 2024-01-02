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
  createNewblogCat,
  getABlogCat,
  resetState,
  updateABlogCat,
  getCategories,
  deleteABlogCat,
} from "../features/bcategory/bcategorySlice";
import CustomModal from "../components/CustomModal";
import Popup from "../components/PopupBlogCategory";
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
const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [blogCatId, setblogCatId] = useState("");
  const getBlogCatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createBlogCategory,
    blogCatName,
    updatedBlogCategory,
  } = newBlogCategory;
  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getABlogCat(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId]);
  useEffect(() => {
    if (isSuccess && createBlogCategory) {
      toast.success("Blog Category Added Successfullly!");
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog Category Updated Successfullly!");
      navigate("/admin/blog-category");
    }
    // if (isError) {
    //   toast.error("Something Went Wrong!");
    // }
  }, [isSuccess, isError, isLoading]);
  const showModal = (e) => {
    setOpen(true);
    setblogCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const showEditModal = (e) => {
    setOpenPopup(true);
    setblogCatId(e);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // const data = { id: getBlogCatId, blogCatData: values };
      // if (getBlogCatId !== undefined) {
      //   dispatch(updateABlogCat(data));
      //   dispatch(resetState());
      // } else {
      dispatch(createNewblogCat(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(getCategories());
        dispatch(resetState());
      }, 300);
      // }
    },
  });

  const bCatState = useSelector((state) => state.bCategory.bCategories);
  console.log(bCatState);
  const data1 = [];
  for (let i = 0; i < bCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: bCatState[i].title,
      action: (
        <>
          {/* <Link
            to={`/admin/blog-category/${bCatState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link> */}
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              // showEditModal(`${brandState[i]._id}`);
              navigate(`/admin/blog-category/${bCatState[i]._id}`);
              showEditModal(`${bCatState[i]._id}`);
            }}
          >
            <BiEdit />
          </button>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(bCatState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCat(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };
  const editBlogCategory = (e) => {
    dispatch(updatedBlogCategory(e));
    setOpen(false);
  };
  return (
    <div>
      <h3 className="mb-4  title">
        {/* {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category */}
        Add Blog Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChg={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Blog Category"
            id="blogcat"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {/* {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category */}
            Add Blog Category
          </button>
        </form>
      </div>
      <div>
        <h3 className="mb-4 title">Blog Categories</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteBlogCategory(blogCatId);
          }}
          title="Are you sure you want to delete this blog category?"
        />
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title="Edit Blog Category"
          performAction={() => {
            editBlogCategory(blogCatId);
          }}
        ></Popup>
      </div>
    </div>
  );
};

export default Addblogcat;
