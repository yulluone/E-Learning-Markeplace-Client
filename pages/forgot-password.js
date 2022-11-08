import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  //state
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [codeValid, setCodeValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //context
  const {
    state: { user },
  } = useContext(Context);

  //router
  const router = useRouter();

  //if user is logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!success) {
      try {
        const { data } = await axios.post("/auth/forgot-password", {
          email,
          success,
        });
        setSuccess(true);
        setLoading(false);
        toast("Check your email for the secret code");
      } catch (err) {
        setLoading(false);
        toast(err);
      }
    }
    if (success === true) {
      try {
        const { data } = await axios.post("/auth/forgot-password", {
          code,
          email,
          success,
        });

        if (!data.codeValid) {
          toast(data.message);
          setLoading(false);
        } else {
          setCodeValid(true);
          toast(data.message);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/auth/forgot-password",
        {
          email,
          codeValid,
          code,
          success,
          newPassword,
        }
      );

      toast(data.message);

      setLoading(false);
      router.push("/login");
    } catch (err) {
      console.log(err);
      setLoading(False);
    }
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">
        Forgot Password
      </h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={!codeValid ? handleSubmit : changePassword}>
          <input
            className="form-control mb-4 p-4"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={!success ? "Enter Email" : email}
            disabled={success === true}
            required
          />
          {email && (
            <small
              onClick={(e) => {
                setEmail(e.target.value);
                setSuccess(true);
              }}
              className="p-1"
            >
              Already Have Code?
            </small>
          )}

          {success && (
            <input
              className="form-control mb-4 p-4"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={!codeValid ? " Enter Secret Code" : code}
            />
          )}

          {codeValid && (
            <input
              type="password"
              className="form-control mb-4 p-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeHolder="Enter New password"
            />
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block p-2"
            disabled={loading || !email}
          >
            {loading ? <SyncOutlined spin /> : !success ? "Get Code" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
