import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";

const CourseView = () => {
  const [course, setCourse] = useState();

  const router = useRouter();
  const slug = router.query.slug;

  useEffect(() => {
    console.log(slug);
  }, [slug]);

  return (
    <InstructorRoute>
      <div class="container-fluid pt-3">
        <p>view {slug}</p>
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
