import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Bloglist from "./pages/Bloglist";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colorlist";
import Sizelist from "./pages/Sizelist";
import Categorylist from "./pages/Categorylist";
import Addbrand from "./pages/Addbrand";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addsize from "./pages/Addsize";

import Addcat from "./pages/Addcat";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import AddCoupon from "./pages/Addcoupon";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />

          <Route path="add-blog" element={<Addblog />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />

          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<ViewOrder />} />

          <Route path="customers" element={<Customers />} />

          <Route path="add-color" element={<Addcolor />} />
          <Route path="color-list" element={<Colorlist />} />
          <Route path="color/:id" element={<Addcolor />} />

          <Route path="add-size" element={<Addsize />} />
          <Route path="size-list" element={<Sizelist />} />
          <Route path="size/:id" element={<Addsize />} />

          <Route path="add-category" element={<Addcat />} />
          <Route path="category-list" element={<Categorylist />} />
          <Route path="category/:id" element={<Addcat />} />

          <Route path="add-brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="brand-list" element={<Brandlist />} />

          <Route path="add-product" element={<Addproduct />} />
          <Route path="product/:id" element={<Addproduct />} />
          <Route path="product-list" element={<Productlist />} />

          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
