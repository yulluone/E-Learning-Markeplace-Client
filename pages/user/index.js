import { useContext, useState, useEffect } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import UserDashboardCourses from "../../components/cards/UserDashboardCourses";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/auth/user-courses");
      setCourses(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <UserRoute>
      {loading ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center diplay-1 text-daanger p-5"
        />
      ) : (
        <>
          <h1 className="jumbotron text-center square">User Dashboard</h1>
          {courses && courses.length ? (
            <h4 className="text-primary">
              Enrolled in {courses.length} courses
            </h4>
          ) : (
            <h4 className="text-danger">Enrolled courses will appear hear</h4>
          )}
          <UserDashboardCourses courses={courses} />
        </>
      )}
    </UserRoute>
  );
};

export default UserIndex;
