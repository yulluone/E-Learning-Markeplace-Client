import { useState, useEffect, useContext } from "react";
import {
  DollarOutlined,
  SettingOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import InstructorRoute from "../../components/routes/InstructorRoute";
import context from "../../context";
import axios from "axios";

const Revenue = () => {
  //states
  const [balance, setBalance] = useState(0);

  const loadBalance = async () => {
    const { data } = await axios.post(`/auth/instructor/balance`);
    setBalance(data);
    console.log("BALANCE =>", data);
  };

  const handleChangeNumber = () => {
    console.log("CHANGE NUMBER");
  };
  useEffect(() => {
    loadBalance();
  }, []);

  return (
    <InstructorRoute>
      <div className="container ">
        <div className="row pt-2">
          <div className="col-md-8 ofsset md-2 bg-light p-5">
            <h2>
              Revenue Report
              <DollarOutlined className="float-right" />
            </h2>
            <small>Payment is disbursed your M-PESA number every 48hrs</small>
            <hr />
            <h4 className=" ">
              Pending Balance:{" "}
              <span className="float-right text-success">Ksh. {balance}</span>
            </h4>
            <small>For the last 48Hrs</small>

            <hr />

            <h2>
              Payout{" "}
              <SettingOutlined
                onClick={handleChangeNumber}
                className="float-right text-danger pointer"
              />{" "}
            </h2>
            <small>Change M-Pesa Number</small>
          </div>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default Revenue;
