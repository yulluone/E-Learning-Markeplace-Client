import { Avatar } from "antd";
import Link from "next/link";
import { PlayCircleOutlined } from "@ant-design/icons";

const UserDashboardCourses = ({ courses, user }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course._id} className="media pt-2 pb-1">
          <Avatar
            size={100}
            shape="square"
            src={`https://ipfs.filebase.io/ipfs/${course.image.cid}`}
          />

          <div className=" pl-3 " style={{ width: "100%" }}>
            <div className="row">
              <div className="col">
                <Link href={`/user/course/${course.slug}`} className="pointer ">
                  <h5 className="mt-2 text-primary">{course.name}</h5>
                </Link>
                <p style={{ marginTop: "-10px" }}>
                  {course.lessons.length} Lessons
                </p>
                <p
                  className="text-muted"
                  style={{ marginTop: "-15px", fontSize: "12px" }}
                >
                  By {course.instructor.name}
                </p>
              </div>

              <div className="col-md-3 mt-3 text-center">
                <Link href={`/user/course/${course.slug}`}>
                  <PlayCircleOutlined className="h2 pointer text-primary" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDashboardCourses;
