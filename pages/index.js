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
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
      </h1>
      {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}

      <div className="container-fluid">
        <div className="row ">
          {courses &&
            courses.map((course) => (
              <CourseCard className="p-2" course={course} />
            ))}
        </div>
      </div>
    </>
  );
};

// export async function getServerSideProps() {
//   try {
//     const { data } = await axios.get(`/auth/courses`);
//     console.log(data);
//     return {
//       props: {
//         dataC: data,
//       },
//     };
//   } catch (err) {
//     console.log(err);
//   }
//   // const { data } = await axios.get(`http://localhost:8000/auth/courses`);
//   // return {
//   //   props: {
//   //     // courses: data,
//   //   },
//   // };
// }

export default Index;
