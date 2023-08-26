import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  FormOutlined,
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
        style={{height:"500vh"}}
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "User Dashboard",
            icon: <AppstoreOutlined />,
            key: "/userdash",
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
         
          // {
          //   label: "Pending CLients",
          //   key: "/pendingCustomers",
          //   icon: <UserOutlined />,
          // },
          {
            label: "Properties",
            key: "/properties",
            icon: <HomeOutlined />,
          },
          {
            label: "Property Form",
            key: "/form",
            icon: <FormOutlined />,
          },
          {
            label: "Company Form",
            key: "/companyform",
            icon: <FormOutlined />,
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
