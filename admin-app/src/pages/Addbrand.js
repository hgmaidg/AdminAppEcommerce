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
  deleteABrand,
  getBrands,
  // resetState,
} from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";
import Popup from "../components/PopupBrand";

import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brand/brandSlice";
import EditBrandModal from "../components/EditBrandModal";

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

let schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});
const Addbrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);

  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const showEditModal = (e) => {
    setOpenPopup(true);
    setbrandId(e);
  };
  const hideEditModal = () => {
    setOpenPopup(false);
  };
  // const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);
  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].title,
      action: (
        <>
          {/* <Link
            to={`/admin/brand/${brandState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link> */}
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              // showEditModal(`${brandState[i]._id}`);
              navigate(`/admin/brand/${brandState[i]._id}`);
              showEditModal(`${brandState[i]._id}`);
            }}
          >
            {/* <Link
              to={`/admin/brand/${brandState[i]._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link> */}
            <BiEdit />
          </button>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brandState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };
  const editBrand = (e) => {
    dispatch(updateABrand(e));

    setOpen(false);
    // setTimeout(() => {
    //   dispatch(getBrands());
    // }, 100);
  };
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  // useEffect(() => {
  //   if (isSuccess && createdBrand) {
  //     toast.success("Brand Added Successfullly!");
  //   }
  //   // dispatch(getBrands());
  //   if (isSuccess && updatedBrand) {
  //     toast.success("Brand Updated Successfullly!");
  //     navigate("/admin/add-brand");
  //   }

  //   if (isError) {
  //     toast.error("Something Went Wrong!");
  //   }
  // }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // if (getBrandId !== undefined) {
      //   const data = { id: getBrandId, brandData: values };
      //   dispatch(updateABrand(data));
      //   dispatch(resetState());
      // } else {
      {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(getBrands());
          dispatch(resetState());
        }, 100);
        if (isSuccess && createdBrand) {
          toast.success("Brand Added Successfullly!");
        }
        // dispatch(getBrands());
        // if (isSuccess && updatedBrand) {
        //   toast.success("Brand Updated Successfullly!");
        //   navigate("/admin/add-brand");
        // }

        if (isError) {
          toast.error("Something Went Wrong!");
        }
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */}
        Add Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChg={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Brand"
            id="brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */}
            Add Brand
          </button>
        </form>
      </div>
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="Are you sure you want to delete this brand?"
      />
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Edit Brand"
        performAction={() => {
          editBrand(brandId);
        }}
      ></Popup>
    </div>
  );
};

export default Addbrand;
