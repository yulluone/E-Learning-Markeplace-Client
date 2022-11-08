import { useState, useEffect } from "react";
import Link from "next/link";

const InstructorNav = () => {
  const [current, setCurrent] = useState();

  useEffect(() => {
    //make sure we are in the client side(browser mode)
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills mt-2">
      <Link
        href="/studio"
        className={`nav-link ${current === "/studio" && "active"}`}
      >
        Dashboard
      </Link>

      <Link
        href="/studio/course/create"
        className={`nav-link ${
          current === "/studio/course/create" && "active"
        }`}
      >
        Course Create
      </Link>
    </div>
  );
};

export default InstructorNav;
