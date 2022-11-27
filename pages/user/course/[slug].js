import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect, createElement } from "react";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

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
          <Button
            className="text-primary mt-2 btn-block mb-2 "
            onClick={() => setCollapsed(!collapsed)}
          >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}{" "}
            {!collapsed && "Lessons"}
          </Button>
          <Menu
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{ height: "80vh", overflow: "hidden" }}
          >
            <Item
              icon={<Avatar>Zero</Avatar>}
              onClick={() => setClicked(-1)}
            >Course Description</Item>
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
          {clicked > -1 ? (
            <>
              {course.lessons[clicked].video &&
                course.lessons[clicked].video.Location && (
                  <>
                    <ReactPlayer
                      className="player"
                      controls
                      url={course.lessons[clicked].video.Location}
                      width="100%"
                      height="80%"
                    />
                  </>
                )}
              <ReactMarkdown className="single-pos">
                {course.lessons[clicked].content}
              </ReactMarkdown>
            </>
          ) : (
            <>
              <ReactMarkdown>{course.description}</ReactMarkdown>
              <div className="d-flex justify-content-center p-5">
                <div className="text-center p-5">
                  <PlayCircleOutlined
                    className="text-primary display-1 p-5"
                    onClick={() => {
                      setClicked(1);
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </StudentRoute>
  );
};

export default UserCourseView;
