import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { Table, Radio } from "antd";
import ReactQuill from "react-quill";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../features/coupon/couponSlice";

let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount Percentage is Required"),
  limit: yup.number().required("Limit is Required"),
  // active: yup.boolean().required("Active is Required"),
  description: yup.string().required("Description is Required"),
  limitTurn: yup.number().required("Limit Turn is Required"),
  minBillToApply: yup.number().required("Minimum Bill is Required"),
});
const Addcoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];

  const newCoupon = useSelector((state) => state.coupon);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
    couponActive,
    couponDescription,
    couponLimitTurn,
    couponLimit,
    couponMinBill,
    updatedCoupon,
  } = newCoupon;

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfullly!");
    }

    if (isError && couponName && couponDiscount && couponExpiry) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      description: couponDescription || "",
      expiry: changeDateFormat(couponExpiry) || "",
      discount: couponDiscount || "",
      limit: couponLimit || "",
      limitTurn: couponLimitTurn || "",
      minBillToApply: couponMinBill || "",
      active: couponActive || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
        toast.success("Coupon Updated Successfullly!");
        navigate("/admin/coupon-list");
        dispatch(resetState());
      } else {
        const data = { id: getCouponId, couponData: values };
        console.log("add");
        dispatch(createCoupon(values));
        toast.success("Coupon Updated Successfullly!");
        navigate("/admin/coupon-list");
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState);
        }, 300);
      }
      // dispatch(createProducts(values));
      // formik.resetForm();
      // setColor(null);
      // setTimeout(() => {
      //   dispatch(resetState());
      // }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="name"
            onChg={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            label="Enter Coupon Name"
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <div className="" style={{ padding: "1rem 0 0" }}>
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>

          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            name="limit"
            onChg={formik.handleChange("limit")}
            onBlr={formik.handleBlur("limit")}
            val={formik.values.limit}
            label="Enter Limit"
            id="limit"
          />
          <div className="error">
            {formik.touched.limit && formik.errors.limit}
          </div>
          <CustomInput
            type="date"
            name="expiry"
            onChg={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            label="Enter Expiry Data"
            id="date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            name="discount"
            onChg={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            val={formik.values.discount}
            label="Enter Discount"
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <CustomInput
            type="number"
            name="limitTurn"
            onChg={formik.handleChange("limitTurn")}
            onBlr={formik.handleBlur("limitTurn")}
            val={formik.values.limitTurn}
            label="Enter Limit Turns"
            id="limitTurn"
          />
          <div className="error">
            {formik.touched.limitTurn && formik.errors.limitTurn}
          </div>
          <CustomInput
            type="number"
            name="minBillToApply"
            onChg={formik.handleChange("minBillToApply")}
            onBlr={formik.handleBlur("minBillToApply")}
            val={formik.values.minBillToApply}
            label="Enter Minimum Bill To Apply Coupon"
            id="minBillToApply"
          />
          <div className="error">
            {formik.touched.minBillToApply && formik.errors.minBillToApply}
          </div>

          <div style={{ padding: "1rem 0 0" }}>
            <input
              className="me-3 form-check-input"
              type="checkbox"
              name="active"
              id="active"
              onChange={formik.handleChange("active")}
              onBlur={formik.handleBlur("active")}
              value={formik.values.active}
            />
            <label htmlFor="active">Active</label>
          </div>
          {/* <CustomInput
            type="option"
            name="active"
            onChg={formik.handleChange("active")}
            onBlr={formik.handleBlur("active")}
            val={formik.values.active}
            label="Enter Minimum Bill To Apply Coupon"
            id="active"
          /> */}
          <div className="error">
            {formik.touched.active && formik.errors.active}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcoupon;
