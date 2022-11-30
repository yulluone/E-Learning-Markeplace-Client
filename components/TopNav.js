import { useState, useEffect, useContext } from "react";
import { Menu, Tooltip } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LogoutOutlined,
  CoffeeOutlined,
  LoginOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  VideoCameraOutlined,
  VideoCameraAddOutlined,
  TeamOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    //make sure we are in the client side(browser mode)
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");

    const { data } = await axios.get("/auth/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]} className="d-block mb-2">
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href="/">Market</Link>
      </Item>

      {user === null && (
        <>
          <Item
            className="float-right"
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">Login</Link>
          </Item>

          <Item
            className="float-right"
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/register">Register</Link>
          </Item>
        </>
      )}

      {user !== null && (
        <SubMenu
          icon={<CoffeeOutlined />}
          title={user.name}
          className="float-right"
        >
          <ItemGroup>
            <Item key="/user">
              <Link href="/user">Dashboard</Link>
            </Item>
            <Item onClick={logout} icon={<LogoutOutlined />}>
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
      {user !== null && user.role && !user.role.includes("Instructor") && (
        <Item
          key="/studio/become-instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
          className="float-right"
        >
          <Link href="/studio/become-instructor">Become Instructor</Link>
        </Item>
      )}

      {/* {user !== null && user.role && user.role.includes("Instructor") && (
        
      )} */}

      {user !== null && user.role && user.role.includes("Instructor") && (
        <>
          <Item
            key="/studio/revenue"
            onClick={(e) => setCurrent(e.key)}
            className="float-right"
          >
            <Tooltip title="Revenue">
              <Link href="/studio/revenue"></Link>
              <DollarCircleOutlined
                className=" text-success"
                style={{ fontSize: "23px", marginTop: "-10px" }}
              />
            </Tooltip>
          </Item>

          <Item
            key="/studio/course/create"
            onClick={(e) => setCurrent(e.key)}
            // icon={<CarryOutOutlined />}
            className="float-right "
          >
            <Tooltip title="Create New Course">
              <Link href="/studio/course/create">
                <VideoCameraAddOutlined />
              </Link>
            </Tooltip>
          </Item>

          <Item
            key="/studio"
            onClick={(e) => setCurrent(e.key)}
            icon={<VideoCameraOutlined />}
            className="float-right"
          >
            <Link href="/studio">Studio</Link>
          </Item>
        </>
      )}
    </Menu>
  );
};

export default TopNav;
