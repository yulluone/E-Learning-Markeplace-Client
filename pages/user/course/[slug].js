import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import StudentRoute from "../../../components/routes/StudentRoute";

const UserCourseView = () => {
  const router = useRouter();
  const { slug } = router.query;

  //states
  const [course, setCourse] = useState({ lessons: [] });
  const [loading, setLoading] = useState(false);

  //populate course && page
  useEffect(() => {
    if (!slug) return;
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/auth/course/${slug}`);
    setCourse(data.course);
  };

  //handlers

  return (
    <StudentRoute>
      <pre>{JSON.stringify(course)}</pre>
    </StudentRoute>
  );
};

export default UserCourseView;
