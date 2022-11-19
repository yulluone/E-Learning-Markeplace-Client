import axios from "axios";
import { useEffect, useState, useContext } from "react";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar } from "antd";
import Link from "next/link";
import { Context } from "../../context";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter;
  const data = router.query;

  useEffect(() => {
    // if (!router.isReady) return;
    console.log("DATA");
    console.log(data);

    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/instructor/instructor-courses");
    setCourses(data);
  };

  const myStyle = { marginTop: "-15px", fontSize: "12px" };

  return (
    <InstructorRoute>
      <h1 className=" jumbotron text-center square ">Instructor Dashboard</h1>
      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}

      {courses &&
        courses.map((course) => (
          <>
            <div className="media pt-2">
              <Avatar
                size={80}
                src={
                  course.image
                    ? `https://ipfs.filebase.io/ipfs/${course.image.cid}`
                    : "/course.jpg"
                }
              />

              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <Link
                      href={{
                        pathname: "/studio/course/view/[slug]",
                        query: { slug: course.slug },
                      }}
                    >
                      <h5 className=" mt-2  text-primary pt-2">
                        {course.name}
                      </h5>
                    </Link>

                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons.length} Lessons
                    </p>

                    {course.lessons.length < 5 ? (
                      <p style={myStyle} className="text-warning">
                        At least 5 lessons required to pulsish your course
                      </p>
                    ) : course.published ? (
                      <p style={myStyle} className="text-primary">
                        Your course is live in the market place
                      </p>
                    ) : (
                      <p style={myStyle} className="text-success">
                        Your course is ready to be published
                      </p>
                    )}
                  </div>
                  <div className="col-md-3 mt-3 text-center">
                    {course.published ? (
                      <div>
                        <CheckCircleOutlined className="h5 pointer text-success " />
                      </div>
                    ) : (
                      <div className="h5 pointer text-warning">
                        <CloseCircleOutlined />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </InstructorRoute>
  );
};

export default InstructorIndex;
