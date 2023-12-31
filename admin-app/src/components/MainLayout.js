import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineUnorderedList,
  AiOutlineBgColors,
  AiOutlinePicLeft,
  AiOutlinePicRight,
} from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { CiSquareQuestion } from "react-icons/ci";
import { PiSneakerMoveFill } from "react-icons/pi";
import { GrBlog } from "react-icons/gr";
import { ImBlog } from "react-icons/im";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">
              <PiSneakerMoveFill className="fs-3" />
            </span>
            <span className="lg-logo">Sneakify</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "add-product",
                  icon: <AiOutlineShoppingCart className="fs-5" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineUnorderedList className="fs-5" />,
                  label: "Product List",
                },
                {
                  key: "add-brand",
                  icon: <GrBlog className="fs-5" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <GrBlog className="fs-5" />,
                  label: "Brand List",
                },
                {
                  key: "add-category",
                  icon: <BiCategory className="fs-5" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <BiCategory className="fs-5" />,
                  label: "Category List",
                },
                {
                  key: "add-color",
                  icon: <AiOutlineBgColors className="fs-5" />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineBgColors className="fs-5" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <HiOutlineClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "blogs",
              icon: <ImBlog className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "add-blog",
                  icon: <ImBlog className="fs-5" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <ImBlog className="fs-5" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog className="fs-5" />,
                  label: "Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <ImBlog className="fs-5" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <CiSquareQuestion className="fs-4" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-3 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlinePicLeft /> : <AiOutlinePicRight />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <IoMdNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/402845452_879944543539369_7955132519176891494_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFlsx8xmHGHGvd3ixQHPr9yGD2c34Igu1EYPZzfgiC7UUnZd-sKDu7HYDypLb4hiMQ5ghDrKIHmTHK8_Zq_aWwg&_nc_ohc=PpNmofvYjywAX_kGNzC&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfBWDetCtumoDqYvcVGgNsllTjw5FLHVCm30W4WzO9li5g&oe=65685919"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Admin</h5>
                <p className="mb-0">hgmaidg@gmail.com</p>
              </div>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-2 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="#"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-2 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="#"
                  >
                    signout
                  </Link>
                </li>
                {/* <li>
                  <Link
                    className="dropdown-item py-2 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="#"
                  >
                    Something else here
                  </Link>
                </li> */}
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
