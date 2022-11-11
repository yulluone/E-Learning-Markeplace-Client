import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Modal } from "antd";
import { CheckOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import { toast } from "react-toastify";

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
  //Funcions for add lessson

  const handleAddLesson = (e) => {
    e.preventDefault();
    console.log(values);
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

      //save progress bar and send video as form data to backend
      const { data } = await axios.post(
        "/instructor/course/video-upload",
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
    } catch (err) {
      setUploading(false);
      console.log(err);
      toast("video upload failed");
    }
  };

  useEffect(() => {
    loadCourse();
  }, [slug]);

  return (
    <InstructorRoute>
      <div className="container-fluid pt-3">
        {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
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
                    <p style={{ marginTop: "-13px", fontSize: "15px" }}>
                      {course.category}
                    </p>
                  </div>
                  <div className="d-flex pt-4">
                    <Tooltip title="Edit">
                      <EditOutlined className="h5 pointer text-warning mr-4" />
                    </Tooltip>
                    <Tooltip title="Publish">
                      <CheckOutlined className="h5 pointer text-danger mr-4" />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div class="col">
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
                />
              </Modal>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
