import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";

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
    setCourse(data);
  };

  //handlers

  return <pre>{JSON.stringify(course, null, 4)}</pre>;
};

export default UserCourseView;
