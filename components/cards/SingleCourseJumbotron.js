import ReactMarkdown from "react-markdown";
import { Badge, Button, Tooltip } from "antd";
import ReactPlayer from "react-player";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const SingleCourseJumbotron = ({
  course,
  showModal,
  setShowModal,
  setPreview,
  handleFreeEnrollment,
  handlePaidEnrollment,
  loading,
  user,
  preview,
  enrolled,
  setMpesaNumber,
  mpesaNumber,
}) => {
  const {
    name,
    description,
    image,
    paid,
    category,
    lessons,
    instructor,
    price,
    updatedAt,
  } = course;

  return (
    <div className="jumbotron bg-primary square">
      <div className="row">
        <div className="col-md-8">
          {/* title */}
          <h1 className="text-light font-weight-bold">{name}</h1>
          {/* description */}

          <p
            className="lead text-light"
            style={{ fontSize: "18px" }}
          >
            {description && description.substring(0, 320) + " ..."}
          </p>
          {/* category */}
          <Badge
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-4 mt-2"
          />

          {/* author */}
          <p>Created by {instructor && instructor.name}</p>

          {/* updatedAt */}
          <p>Last updated {new Date(updatedAt).toLocaleDateString()}</p>

          {/* price */}
          <h4 className="text-light">{paid ? `KES ${price}` : "Free"}</h4>
        </div>

        <div className="col-md-4">
          {lessons && lessons[0].video && lessons[0].video.Location ? (
            <div
              onClick={() => {
                setPreview(lessons[0].video.Location);
                setShowModal(!showModal);
              }}
            >
              <ReactPlayer
                className="react-player-dv"
                url={lessons[0].video.Location}
                width="100%"
                height="220px"
                light={image && `https://ipfs.filebase.io/ipfs/${image.cid}`}
              />
            </div>
          ) : (
            <>
              <img
                src={image && `https://ipfs.filebase.io/ipfs/${image.cid}`}
                width="100%"
                style={{ objectFit: "cover", height: "300px" }}
              />
            </>
          )}
          {/* Mpesa Number */}
          {user && paid && !enrolled && (
            <div className="mt-4">
              {/* <span>Enter Mpesa Number</span> */}

              <small className="lead text-warning" style={{ fontSize: "12px" }}>
                {mpesaNumber &&
                  mpesaNumber.length !== 12 &&
                  "Use format (2547********)"}
              </small>
              <div class="d-flex align-items-center">
                <input
                  type="number"
                  className="form-control mb-3 mt-2 p-4 "
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(e.target.value)}
                  placeholder="Enter M-PESA Number"
                  required
                />
                <Tooltip title="A payment prompt will be send to the phone number you provide. ">
                  <QuestionCircleOutlined className="ml-3 h4 text-primary" />
                </Tooltip>
              </div>
            </div>
          )}
          {/* Enrollemnt Button */}
          {loading ? (
            <div className="d-flex justify-content-center">
              <LoadingOutlined className="h1 text-danger mt-3 mb-3" />
            </div>
          ) : (
            <Button
              className=" mt-3"
              shape="round"
              block
              type="danger"
              size="large"
              onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
              disabled={mpesaNumber && mpesaNumber.length !== 12}
            >
              {user
                ? enrolled
                  ? "Continue to course page"
                  : "Enroll"
                : "Login to enroll"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCourseJumbotron;
