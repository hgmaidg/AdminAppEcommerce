// // EditBrandModal.jsx

// import React from "react";
// import { Modal } from "antd";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import CustomInput from "../components/CustomInput";

// const schema = yup.object().shape({
//   title: yup.string().required("Brand Name is Required"),
// });

// const EditBrandModal = ({ brandDetails, onSubmit, onCancel, props }) => {
//   const { open, hideModal, performAction, title } = props;
//   const formik = useFormik({
//     initialValues: {
//       title: brandDetails.title,
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       onSubmit(values);
//     },
//   });

//   return (
//     <Modal
//       title="Confirmation"
//       open={open}
//       onOk={performAction}
//       onCancel={hideModal}
//       okText="Ok"
//       cancelText="Cancel"
//     >
//       <p>{title}</p>
//       <div>
//         <form onSubmit={formik.handleSubmit}>
//           <CustomInput
//             type="text"
//             name="title"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.title}
//             label="Enter Brand"
//             id="brand"
//           />
//           <div className="error">
//             {formik.touched.title && formik.errors.title}
//           </div>
//           <button type="submit">Save Changes</button>
//           <button type="button" onClick={onCancel}>
//             Cancel
//           </button>
//         </form>
//       </div>
//     </Modal>
//   );
// };

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
import { Modal } from "antd";
import {
  deleteABrand,
  getBrands,
  // resetState,
} from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brand/brandSlice";

let schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});
const EditBrandModal = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
  const [brandId, setbrandId] = useState("");
  const newBrand = useSelector((state) => state.brand);
  const brandState = useSelector((state) => state.brand.brands);
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
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfullly!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfullly!");
      navigate("/admin/list-brand");
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const { openEdit, hideEditModal, performAction, title } = props;
  return (
    <Modal
      title="Edit"
      openEdit={openEdit}
      onOk={performAction}
      onCancel={hideEditModal}
      okText="Ok"
      cancelText="Cancel"
    >
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
            {getBrandId !== undefined ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditBrandModal;
