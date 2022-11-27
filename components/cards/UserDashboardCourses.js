import { Avatar } from "antd";
import Link from "next/link";
import { PlayCircleOutlined } from "@ant-design/icons";

const UserDashboardCourses = ({ courses, user }) => {
  return (
    <>
      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}
      {courses.map((course) => (
        <div key={course._id} className="media pt-2 pb-1 row">
          <Avatar
            size={100}
            shape="square"
            src={`https://ipfs.filebase.io/ipfs/${course.image.cid}`}
          />
          <Link href={`/user/course/${course.slug}`} className="ml-3">
            <div className="col">
              <h4>{course.name}</h4>
              <PlayCircleOutlined className="h1 float-right" />
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default UserDashboardCourses;
