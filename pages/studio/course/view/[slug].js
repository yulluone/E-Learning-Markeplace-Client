import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Modal, List } from "antd";
import {
  CheckOutlined,
  EditOutlined,
  UploadOutlined,
  QuestionOutlined,
  CloseOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import { toast } from "react-toastify";
import Item from "antd/lib/list/Item";

const CourseView = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [course, setCourse] = useState();
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0);
  const [students, setStudents] = useState([]);

  //load course data
  useEffect(() => {
    loadCourse();
  }, [slug]);

  //load Student count

  useEffect(() => {
    course && loadStudentCount();
  }, [course]);

  //load students handler
  const loadStudentCount = async () => {
    try {
      const { data } = await axios.post(`/instructor/student-count`, {
        courseId: course._id,
        instructorId: course.instructor._id,
      });
      setStudents(data);
      console.log(data);
      console.log("STUDENTS ENROLLED => ", students);
    } catch (err) {
      console.log(err);
    }
  };

  // add lessson

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/instructor/course/lesson-add/${course._id}/${course.instructor}`,
        values
      );
      console.log(data);
      setValues({ ...values, title: "", content: "", video: {} });
      setVisible(false);
      setUploadButtonText("Upload Video");
      setCourse(data);
      toast("Lesson added");
    } catch (err) {
      console.log(err);
      toast("Lesson add failed. Try again.");
    }
  };

  const loadCourse = async () => {
    try {
      if (!slug) return;
      const { data } = await axios.get(`/instructor/course/${slug}`);
      setCourse(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleVideo = async (e) => {
    try {
      setUploading(true);

      const file = e.target.files[0];
      setUploadButtonText(file.name);

      //video to formData
      const videoData = new FormData();
      videoData.append("video", file);
      videoData.append("instructorId", course.instructor._id);

      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/instructor/course/video-upload/${course.instructor}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );

      //once response is received
      console.log(data);

      setValues({
        ...values,
        video: data,
      });
      setUploading(false);
    } catch (err) {
      setUploading(false);
      console.log(err);
      toast("video upload failed");
    }
  };

  const handleRemoveVideo = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/instructor/course/video-remove/${course.instructor}`,
        {
          video: values.video,
        }
      );
      console.log(data);
      setValues({
        ...values,
        video: {},
      });
      setUploading(false);
      setUploadButtonText("Upload Another Video");
    } catch (err) {
      console.log(err);
      toast("error removing video");
      setUploading(false);
    }
  };

  const handlePublishCourse = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you to take your course live? Once published, this course will be available in the market place for students to enroll."
      );
      if (!answer) return;

      const { data } = await axios.put(
        `/instructor/course/publish-course/${course._id}`
      );
      console.log(data);
      toast("Congrats! Course is now live	in the marketplace");
      setCourse(data);
    } catch (err) {
      console.log(err);
      toast("Attempt to publish course failed. Try again.");
    }
  };

  const handleUnpublishCourse = async () => {
    try {
      let answer = window.confirm(
        " Are you sure you want to unpublish course? Once unpulished, this course will no longer be availablein the marketplace for students to enroll."
      );
      if (!answer) return;

      const { data } = await axios.put(
        `/instructor/course/unpublish-course/${course._id}`
      );
      console.log(data);
      toast("Course unpublished");

      setCourse(data);
    } catch (err) {
      console.log(err);
      toast("Attempt to unpublish course failed. Try again.");
    }
  };

  return (
    <InstructorRoute>
      <div className="container-fluid pt-3">
        {course && (
          <div className="container-fluid pt-1">
            <div className="media pt-2">
              <Avatar
                size={80}
                src={
                  course.image
                    ? `https://ipfs.filebase.io/ipfs/${course.image.cid}`
                    : "Name/course.jpg"
                }
              ></Avatar>

              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <h5 className="mt-2 text-primary">{course.name}</h5>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons && course.lessons.length} lessons
                    </p>
                    <p style={{ marginTop: "-13px", Size: "15px" }}>
                      {course.category}
                    </p>
                  </div>
                  <div className="d-flex pt-4">
                    <Tooltip
                      title={`${students.length} students enrolled`}
                      className="d-flex mr-4"
                      // style={{ alighItems: "start" }}
                    >
                      <UserSwitchOutlined className="h5 pointer text-info" />{" "}
                      <b className="h5 text-info" style={{marginTop: "-2px"}}>{students.length}</b>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <EditOutlined
                        onClick={() => {
                          router.push(`/studio/course/edit/${slug}`);
                        }}
                        className="h5 pointer text-warning mr-4"
                      />
                    </Tooltip>

                    {course.lessons && course.lessons.length < 5 ? (
                      <Tooltip title="Atleast 5 lessons needed to publish">
                        <QuestionOutlined className="h5 pointer text-warning" />
                      </Tooltip>
                    ) : course.published ? (
                      <Tooltip title="Unpublish">
                        <CloseOutlined
                          className="h5 pointer text-danger"
                          onClick={handleUnpublishCourse}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Publish">
                        <CheckOutlined
                          className="h5 pointer text-success mr-4"
                          onClick={handlePublishCourse}
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <ReactMarkdown>{course.description}</ReactMarkdown>
              </div>
            </div>
            <div className="row">
              <Button
                onClick={() => setVisible(true)}
                className="col-md-6 offset-md-3 text-center"
                type="primary"
                shape="round"
                icon={<UploadOutlined />}
                size="large"
              >
                Add Lesson
              </Button>

              <Modal
                title="+ Add Lesson"
                centered
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
              >
                <AddLessonForm
                  values={values}
                  setValues={setValues}
                  handleAddLesson={handleAddLesson}
                  uploading={uploading}
                  uploadButtonText={uploadButtonText}
                  setUploadButtonText={setUploadButtonText}
                  handleVideo={handleVideo}
                  progress={progress}
                  handleRemoveVideo={handleRemoveVideo}
                />
              </Modal>
            </div>
            <div className="row pb-5">
              <div className="col lesson-list">
                <h4>
                  {course && course.lessons && course.lessons.length} Lessons
                </h4>
                <List
                  itemLayout="horizontal"
                  dataSource={course && course.lessons}
                  renderItem={(item, index) => (
                    <Item>
                      <Item.Meta
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.title}
                      ></Item.Meta>
                    </Item>
                  )}
                ></List>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
