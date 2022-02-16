import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const Register = () => {
  const [name, setName] = useState("josh");
  const [email, setEmail] = useState("josh@gmail.com");
  const [password, setPassword] = useState("yullujosh");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //
    setLoading(true);
    const data = await axios
      .post(`/auth/register`, {
        name,
        email,
        password,
      })
      .then(
        (response) => {
          // var result = response.data;
          // console.log(result);
          toast.success("Registration Succesful. Please login");
          setLoading(false);
        },
        (error) => {
          // console.log(error);
          toast.error(error.response.data);
          setLoading(false);
        }
      );
    // console.log(data);
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Register</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />

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
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        <p className="text-center p-3">
          Already registered?{" "}
          <Link href="/login">
            <a> Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
