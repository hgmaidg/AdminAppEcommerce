// import React from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// export default function Popup(props) {
//   const { title, children, openPopup, setOpenPopup } = props;
//   const handleClose = () => {
//     setOpenPopup(false);
//   };
//   return (
//     <div className="popup" maxWidth="md">
//       <Dialog open={openPopup} onClose={handleClose}>
//         <DialogTitle>
//           <div>Title</div>
//         </DialogTitle>
//         <DialogContent></DialogContent>
//       </Dialog>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  createCategory,
  getABlogCat,
  resetState,
  updateABlogCat,
  getCategories,
  deleteABlogCat,
} from "../features/bcategory/bcategorySlice";
import CustomInput from "./CustomInput";
let schema = yup.object().shape({
  title: yup.string().required("Blog Category Name is Required"),
});
export default function Popup(props) {
  const { openPopup, setOpenPopup } = props;
  const navigate = useNavigate();
  const location = useLocation();
  //   const [brandName, setBrandName] = useState("");
  const dispatch = useDispatch();
  const getBlogCatId = location.pathname.split("/")[3];
  console.log("Location Path:", location.pathname);
  console.log("Brand ID:", getBlogCatId);
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
    dispatch(resetState());
    dispatch(getABlogCat());
    dispatch(getCategories());
  }, []);

  const handleClose = () => {
    setOpenPopup(false);
    // Additional cleanup or reset logic if needed
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      {
        const data = { id: getBlogCatId, blogCatData: values };
        dispatch(updateABlogCat(data));
        formik.resetForm();
        setTimeout(() => {
          dispatch(getCategories());
        }, 100);
        // dispatch(getBrands());
        handleClose();
        formik.resetForm();
        dispatch(resetState());
      }
    },
  });
  //   const handleInputChange = (event) => {
  //     setBrandName(event.target.value);
  //   };

  return (
    <div className="popup" maxWidth="md">
      <Dialog open={openPopup} onClose={handleClose}>
        <DialogTitle>
          <div>Edit Blog Category</div>
        </DialogTitle>
        <DialogContent>
          {/* Assuming you have a form for editing the brand name */}
          <div>
            <form action="" onSubmit={formik.handleSubmit}>
              <CustomInput
                type="text"
                name="title"
                onChg={formik.handleChange("title")}
                onBlr={formik.handleBlur("title")}
                val={formik.values.title}
                label="Edit Blog Category"
                id="blogcat"
              />
              <div className="error">
                {formik.touched.title && formik.errors.title}
              </div>
              <button
                className="btn btn-success border-0 rounded-3 my-5"
                type="submit"
              >
                Edit
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
