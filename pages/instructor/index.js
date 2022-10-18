import axios from "axios";
import { useEffect, useState } from "react";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  const router = useRouter;

  useEffect(() => {
    console.log(router);
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/instructor/instructor-courses");
    setCourses(data);
  };

  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <InstructorRoute>
      <h1 className=" jumbotron text-center square ">Instructor Dashboard</h1>
      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}

      {courses &&
        courses.map((course) => (
          <>
            <div class="media pt-2">
              <Avatar
                size={80}
                src={`https://ipfs.filebase.io/ipfs/${course.image.cid}`}
              />

              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <Link
                      href="/instrutor/course/view/[slug]"
                      as={`/instrutor/course/view/${course.slug}`}
                    >
                      <a className=" mt-2  text-primary">
                        <h5 className="pt-2">{course.name}</h5>
                      </a>
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
                  <div class="col-md-3 mt-3 text-center">
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
