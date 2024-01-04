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
  createBrand,
  getABrand,
  getBrands,
  updateABrand,
  resetState,
} from "../features/brand/brandSlice";
import CustomInput from "./CustomInput";
let schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});
export default function Popup(props) {
  const { openPopup, setOpenPopup } = props;
  const navigate = useNavigate();
  const location = useLocation();
  //   const [brandName, setBrandName] = useState("");
  const dispatch = useDispatch();
  const getBrandId = location.pathname.split("/")[3];
  console.log("Location Path:", location.pathname);
  console.log("Brand ID:", getBrandId);
  const [brandId, setbrandId] = useState("");
  const [open, setOpen] = useState(false);
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

  //   useEffect(() => {
  //     if (brandId) {
  //       // Find the brand in the state based on brandId
  //       const selectedBrand = brandState.find((brand) => brand._id === brandId);
  //       if (selectedBrand) {
  //         setBrandName(selectedBrand.title);
  //       } else {
  //         // Reset brandName if brandId is not found
  //         setBrandName("");
  //       }
  //     }
  //   }, [brandId, brandState]);
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);
  //   if (isSuccess && updatedBrand) {
  //     toast.success("Brand Updated Successfullly!");

  //     navigate("/admin/add-brand");
  //     dispatch(getBrands());
  //   }
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);

  //   const handleEdit = () => {
  //     // Assuming you have a form for editing the brand name
  //     const updatedBrand = { id: brandId, brandData: { title: brandName } };
  //     dispatch(updateABrand(updatedBrand));
  //     handleClose();
  //   };

  const handleClose = () => {
    setOpenPopup(false);
    // Additional cleanup or reset logic if needed
  };
  const editBrand = (e) => {
    dispatch(updateABrand(e));

    setOpen(false);
    // setTimeout(() => {
    //   dispatch(getBrands());
    // }, 100);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
        formik.resetForm();
        setTimeout(() => {
          dispatch(getBrands());
        }, 100);
        // dispatch(getBrands());
        if (isSuccess && updatedBrand) {
          toast.success("Brand Updated Successfullly!");
          navigate("/admin/add-brand");
        }

        if (isError) {
          toast.error("Something Went Wrong!");
        }
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
          <div>Add Brand</div>
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
                label="Edit Brand"
                id="brand"
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
