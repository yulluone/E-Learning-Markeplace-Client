import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";

const UserRoute = ({ children }) => {
  //state
  const [ok, setOk] = useState(false);


  const router = useRouter();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/auth/current-user"
      );
      if(data.ok) setOk(true);

    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default UserRoute;
