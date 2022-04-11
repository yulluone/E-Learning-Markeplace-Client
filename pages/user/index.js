import { useEffect, useState, useContext } from "react";
import { Context } from "../../context";
import axios from "axios";

const UserIndex = () => {
  //state
  const [hidden, setHidden] = useState(true);

  const {
    state: { user },
    token,
  } = useContext(Context);

  const fetchUser = async () => {
    const user = window.localStorage.getItem(user);
    const token = window.localStorage.getItem(token);
    try {
      const { data } = await axios.get("http://localhost:8000/auth/current-user", {
        user,
        token,
      });
      console.log(data);
      setHidden(false);
    } catch (err) {
      console.log(err);
      setHidden(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {!hidden && (
        <h1 className="jumbotron text-center square">
          <pre>{JSON.stringify(user)}</pre>
        </h1>
      )}
    </>
  );
};

export default UserIndex;
