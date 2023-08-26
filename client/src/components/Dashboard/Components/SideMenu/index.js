import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Admin Dashboard",
            icon: <AppstoreOutlined />,
            key: "/dash",
          },
          // {
          //   label: "Inventory",
          //   key: "/inventory",
          //   icon: <ShopOutlined />,
          // },
          // {
          //   label: "Orders",
          //   key: "/orders",
          //   icon: <ShoppingCartOutlined />,
          // },
          {
            label: "CLients",
            key: "/customers",
            icon: <UserOutlined />,
          },
          {
            label: "Pending CLients",
            key: "/pendingCustomers",
            icon: <UserOutlined />,
          },
          {
            label: "Pending Properties",
            key: "/PendingProperties",
            icon: <UserOutlined />,
          },
          {
            label: "Logout",
            key: "/",
            icon: <LogoutOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
