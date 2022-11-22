import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";

const Index = () => {
  const [courses, setCourses] = useState([]);

  //fetch courses
  const fetchCourses = async () => {
    const { data } = await axios.get("/auth/courses");
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">
        Online Education Marketplace
      </h1>
      <div className="container-fluid">
        <div className="row ">
          {courses &&
            courses.map((course) => (
              <CourseCard className="p-2" course={course} />
              // <pre>{JSON.stringify(course, null, 4)}</pre>
            ))}
        </div>
      </div>
    </>
  );
};

export default Index;
