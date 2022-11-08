import { useState, useEffect } from "react";
import Link from "next/link";

const UserNav = () => {
  const [current, setCurrent] = useState();

  useEffect(() => {
    //make sure we are in the client side(browser mode)
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link
        href="/user"
        className={`nav-link ${current === "/user" && "active"}`}
      >
        Dashboard
      </Link>
    </div>
  );
};

export default UserNav;
