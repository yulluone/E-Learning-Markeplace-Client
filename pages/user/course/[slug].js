import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Buton, Menu, Avatar } from "antd";

const { Item } = Menu;

const UserCourseView = () => {
  const router = useRouter();
  const { slug } = router.query;

  //states
  const [course, setCourse] = useState({ lessons: [] });
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);

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
      {/* <pre>{JSON.stringify(course)}</pre> */}
      <div className="row">
        <div style={{ maxWidth: 320 }}>
          <Menu
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{ height: "80vh", overflow: "hidden" }}
          >
            {course.lessons.map((lesson, index) => (
              <Item
                icon={<Avatar>{index + 1}</Avatar>}
                key={index}
                onClick={() => setClicked(index)}
              >
                {lesson.title.substring(0, 30)}
              </Item>
            ))}
          </Menu>
        </div>
        <div className="col">
          {clicked > -1
            ? JSON.stringify(course.lessons[clicked])
            : course.description}
        </div>
      </div>
    </StudentRoute>
  );
};

export default UserCourseView;
