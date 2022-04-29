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

  // state access
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  //router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      router.push("/user");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:8000/auth/login", {
        username: email,
        password,
      });

      if (!data.ok) {
        toast(data.message);
        setLoading(false);
      } else {
        dispatch({
          type: "LOGIN",
          payload: data.user,
        });

        window.localStorage.setItem("user", JSON.stringify(data.user));
        window.localStorage.setItem("token", data.token);

        // redirect

        toast(data.message);
        setLoading(false);
        router.push("/user");
      }
    } catch (err) {
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
            type="email"
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
          <br />
          <Link href="/forgot-password">
            <a className="p-3"> Forgot-Password?</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
