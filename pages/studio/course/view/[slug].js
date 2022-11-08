import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CourseView = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [course, setCourse] = useState();

  const loadCourse = async () => {
    try {
      console.log("getting courses ...");
      // const { data } = await axios.get("/instructor/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("DATA");
    console.log(slug);
    loadCourse();
  }, []);

  return (
    <div>
      <div className="container-fluid pt-3">
        <p>single course view</p>
      </div>
    </div>
  );
};

export default CourseView;
