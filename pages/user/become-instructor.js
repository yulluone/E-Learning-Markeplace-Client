import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import axios from "axios";
import {
  LoadingOutlined,
  SettingOutlined,
  SyncOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/route/UserRoute";
import { useRouter } from "next/router";


const BecomeInstructor = () => {
  const [mpesaNumber, setMpesaNumber] = useState("0742092240");
  const [mpesaName, setMpesaName] = useState("Joshua Yullu");
  const [valid, setValid] = useState();

  const router = useRouter();


  //state
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/auth/become-instructor", {
        mpesaNumber,
        mpesaName,
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        router.push("/user")
        toast(res.data.message)

      })
      .catch((err) => {
        setLoading(false);
        toast(err.response.data)
        console.log(err);
      });
  };

  return (
    <>
      <h1 className=" jumbotron text-center square "> Become Instructor</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-4">
              <UserSwitchOutlined className="display-1 pb-3" />
              <br />
              <h2>Setup M-PESA to enable payouts </h2>
              <p className="lead text-warning">
                Edemy patners with Flutterwave to enable withdrawals to M-PESA
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  className="form-control mb-4 p-4"
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(e.target.value)}
                  placeholder="Enter M-PESA Number"
                  required
                />

                {!mpesaNumber || mpesaNumber.length === 12 ? (
                  ""
                ) : (
                  <p className="text-warning">Use format (2547********)</p>
                )}
                <h6 className="text-left text-warning">
                  Enter name as it appears on Mpesa registration
                </h6>

                <input
                  type="name"
                  className="form-control mb-4 p-4"
                  value={mpesaName}
                  onChange={(e) => setMpesaName(e.target.value)}
                  placeholder="Enter Name"
                  required
                />

                <button
                  type="submit"
                  className="btn btn-block btn-primary"
                  disabled={!(mpesaNumber.length === 12)}
                >
                  {loading ? <SyncOutlined spin /> : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
