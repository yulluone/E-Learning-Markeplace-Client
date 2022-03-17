import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("josh@gmail.com");
  const [password, setPassword] = useState("yullujosh");
  const [loading, setLoading] = useState(false);

  // // state access
  // const { state, dispatch } = useContext(Context);
  // const { user } = state;

  // //router
  // const router = useRouter();

  // useEffect(() => {
  //   if (user !== null) {
  //     router.push("/");
  //   }
  // }, [user]);

  // console.log("STATE", state);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/auth/login`, {
        username: email,
        password,
      });

      dispatch({
        type: "login",
        payload: data,
      });
      //save in  local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      console.log(user);
      //redirect
      // router.push("/");

      setLoading(false);
    } catch (err) {
      console.log(err);
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Login</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type=""
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Login"}
          </button>
        </form>
        <p className="text-center p-3">
          Not yet registered?{" "}
          <Link href="/register">
            <a> Register</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
