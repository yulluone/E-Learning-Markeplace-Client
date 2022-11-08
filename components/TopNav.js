import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LogoutOutlined,
  CoffeeOutlined,
  LoginOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
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
        <Link href="/">Home</Link>
      </Item>

      {user !== null && user.role && user.role.includes("Instructor") && (
        <Item
          key="/studio/course/create"
          onClick={(e) => setCurrent(e.key)}
          icon={<CarryOutOutlined />}
        >
          <Link href="/studio/course/create">Create Course</Link>
        </Item>
      )}

      {user !== null && user.role && !user.role.includes("Instructor") && (
        <Item
          key="/studio/become-instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
        >
          <Link href="/studio/become-instructor">Become Instructor</Link>
        </Item>
      )}

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

      {user !== null && user.role && user.role.includes("Instructor") && (
        <Item
          key="/studio"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
          className=""
        >
          <Link href="/studio">Instructor</Link>
        </Item>
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
    </Menu>
  );
};

export default TopNav;
