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
  createSize,
  getASize,
  resetState,
  updateASize,
  getSizes,
  deleteASize,
} from "../features/size/sizeSlice";
import CustomInput from "./CustomInput";
let schema = yup.object().shape({
  title: yup.string().required("Size is Required"),
});
export default function Popup(props) {
  const { openPopup, setOpenPopup } = props;
  const navigate = useNavigate();
  const location = useLocation();
  //   const [brandName, setBrandName] = useState("");
  const dispatch = useDispatch();
  const getSizeId = location.pathname.split("/")[3];
  const newSize = useSelector((state) => state.size);
  console.log("Location Path:", location.pathname);
  console.log("Brand ID:", getSizeId);
  const { isSuccess, isError, isLoading, createdSize, updatedSize, sizeName } =
    newSize;
  useEffect(() => {
    if (getSizeId !== undefined) {
      dispatch(getASize(getSizeId));
    } else {
      dispatch(resetState());
    }
  }, [getSizeId]);
  useEffect(() => {
    dispatch(resetState());
    dispatch(getSizes());
  }, []);

  const handleClose = () => {
    setOpenPopup(false);
    // Additional cleanup or reset logic if needed
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: sizeName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      {
        const data = { id: getSizeId, sizeData: values };
        dispatch(updateASize(data));
        formik.resetForm();
        setTimeout(() => {
          dispatch(getSizes());
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
          <div>Edit Size</div>
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
                label="Edit Size"
                id="Size"
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
