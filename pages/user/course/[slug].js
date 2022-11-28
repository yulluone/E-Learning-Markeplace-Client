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
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";

const { Item } = Menu;

const UserCourseView = () => {
  //slug
  const router = useRouter();
  const { slug } = router.query;

  //states
  const [course, setCourse] = useState({ lessons: [] });
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);

  //populate course
  useEffect(() => {
    if (!slug) return;
    loadCourse();
  }, [slug]);

  useEffect(() => {
    if (!course) return;
    loadCompletedLessons();
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/auth/course/${slug}`);
    if (!data.enrolled) {
      router.push("/");
      return;
    }

    setCourse(data.course);
  };

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/auth/completed-lessons`, {
      courseId: course._id,
    });
    setCompletedLessons(data);
    console.log(completedLessons);
  };
  //handlers
  const markCompleted = async () => {
    try {
      const { data } = await axios.post(`/auth/mark-completed`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      });
      setCompletedLessons(data);
    } catch (err) {
      console.log(err);
    }
  };

  const markIncomplete = async () => {
    try {
      const { data } = await axios.post(`/auth/mark-incomplete`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      });
      setCompletedLessons(data);
    } catch (err) {
      console.log(err);
    }
  };

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
            <Item icon={<Avatar>Zero</Avatar>} onClick={() => setClicked(-1)}>
              Course Description
            </Item>
            {course.lessons.map((lesson, index) => (
              <Item
                icon={<Avatar>{index + 1}</Avatar>}
                key={index}
                onClick={() => setClicked(index)}
              >
                {lesson.title.substring(0, 25)}{" "}
                {completedLessons && completedLessons.includes(lesson._id) ? (
                  <CheckCircleFilled
                    className="text-success float-right ml-2"
                    style={{ marginTop: "13px" }}
                  />
                ) : (
                  <MinusCircleFilled
                    className="text-danger float-right ml-2"
                    style={{ marginTop: "13px" }}
                  />
                )}
              </Item>
            ))}
          </Menu>
        </div>
        <div className="col">
          {clicked > -1 ? (
            <>
              <div className="col alert alert-primary square">
                <b>
                  {clicked + 1} {" > "}
                  {course.lessons[clicked].title}
                </b>
                {completedLessons.includes(course.lessons[clicked]._id) ? (
                  <span
                    className="float-right pointer text-primary "
                    onClick={markIncomplete}
                  >
                    Mark as incomplete
                  </span>
                ) : (
                  <span
                    className="float-right pointer text-primary "
                    onClick={markCompleted}
                  >
                    Mark as completed
                  </span>
                )}
              </div>
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
                      setClicked(0);
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
