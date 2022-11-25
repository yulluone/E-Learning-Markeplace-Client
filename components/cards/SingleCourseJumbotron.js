import ReactMarkdown from "react-markdown";
import { Badge, Button } from "antd";
import ReactPlayer from "react-player";
import { LoadingOutlined } from "@ant-design/icons";

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
            // style={{ fontSize: "20px" }}
          >
            {description && description.substring(0, 160) + " ..."}
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
          {/* Enrollemnt Button */}
          {loading ? (
            <div className="d-flex justify-content-center">
              <LoadingOutlined className="h1 text-danger mt-3 mb-3" />
            </div>
          ) : (
            <Button
              className="mb-3 mt-3"
              shape="round"
              block
              type="danger"
              onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
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
