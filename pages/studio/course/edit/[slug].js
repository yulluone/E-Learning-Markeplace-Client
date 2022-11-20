import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { List, Avatar, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import UpdateLessonForm from "../../../../components/forms/UpdateLessonForm";

const { Item } = List;

const CourseEdit = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "999",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    lessons: [],
  });
  const router = useRouter();
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Change Image");
  const { slug } = router.query;

  //states for updating lessons
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});

  /**
   * states and functions for updating lessons
   */

  const [uploadVideoButtonText, setUploadVideoButtonText] =
    useState("UploadVideo");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleVideo = async (e) => {
    console.log("handleVideo");
  };

  const handleUpdateLesson = async (e) => {
    conosle.log("handleUpdateLesson");
  };

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    try {
      if (!slug) return;
      const { data } = await axios.get(`/instructor/course/${slug}`);
      setValues({
        ...values,
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
        paid: data.paid,
        lessons: data.lessons,
      });
      setImage(data.image);
    } catch (err) {
      console.log(err);
      toast("failed to load course");
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    try {
      if (image !== null) {
        handleImageRemove();
      }
    } catch (err) {
      console.log(err);
      toast(err);
    }

    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    //resizeuri

    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (url) => {
      try {
        let { data } = await axios.post("/instructor/course/upload-image", {
          image: url,
        });
        console.log("image uploaded");
        //set image in state
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image Upload failed. Try again later.");
      }
    });
  };

  const handleImageRemove = async () => {
    try {
      setValues({ ...values, loading: true });
      const res = await axios.post("/instructor/course/remove-image", {
        image,
      });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
      toast("Image removed. Uploading new image");
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setValues({ ...values, loading: true });
    try {
      const { data } = await axios.put(`/instructor/course/edit/${slug}`, {
        ...values,
        image,
      });
      setValues(data);
      // setValues({ ...values, loading: false });
      toast("Great! Course updated");
      // router.push("/studio");
    } catch (err) {
      // setValues({ ...values, loading: false });
      toast(err.response.data);
    }
  };

  const handleDrag = (e, index) => {
    // console.log("DRAGING INDEX =>	", index);
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = async (e, index) => {
    // console.log("DROPPED AT INDEX => ", index);
    const itemIndex = e.dataTransfer.getData("itemIndex");
    const dropPosition = index;

    let allLessons = values.lessons;
    let item = allLessons[itemIndex];
    allLessons.splice(itemIndex, 1); //remove dragged	item from its original position
    allLessons.splice(dropPosition, 0, item); //insert dragged item in new position

    setValues({ ...values, lessons: allLessons }); //update lessons arrar in state

    //save lesson rearraangement in db
    const { data } = await axios.put(`/instructor/course/edit/${slug}`, {
      ...values,
      image,
    });
    toast("Great! Lessons rearranged");
  };

  const handleLessonDelete = async (index) => {
    // console.log("DELETE LESSON AT INDEX => ", index);
    const answer = window.confirm(
      "Are you sure you want to delete this lesson?"
    );
    if (!answer) return;
    let allLessons = values.lessons;
    const deleted = allLessons.splice(index, 1);
    setValues({ ...values, lessons: allLessons }); // upldate lessons array in state
    //send delete lesson request to db
    const { data } = await axios.put(
      `/instructor/course/delete/${slug}/${deleted[0]._id}`,
      {
        _id: deleted[0]._id,
      }
    );
    console.log("LESSON DELETED => ", data);
    toast("Great! Lesson deleted");
  };

  return (
    <InstructorRoute>
      <h1 className=" jumbotron text-center square ">Create New Course</h1>
      <div className="pt-3 pb-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImage={handleImage}
          handleImageRemove={handleImageRemove}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          editPage={true}
          image={image}
        />
      </div>
      {/* <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(image, null, 4)}</pre> */}
      <hr />
      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>{values && values.lessons && values.lessons.length} Lessons</h4>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={values && values.lessons}
            renderItem={(item, index) => (
              <Item
                draggable
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                  onClick={() => {
                    setVisible(true);
                    setCurrent(item);
                  }}
                ></Item.Meta>

                <DeleteOutlined
                  onClick={() => handleLessonDelete(index)}
                  className=" text-danger float-right"
                />
              </Item>
            )}
          ></List>
        </div>
      </div>

      <Modal
        title="Update Lesson"
        centered
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
      >
        <UpdateLessonForm
          current={current}
          setCurrent={setCurrent}
          handleVideo={handleVideo}
          handleUpdateLesson={handleUpdateLesson}
          uploading={uploading}
          progress={progress}
          uploadVideoButtonText={uploadVideoButtonText}
        />
        {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
      </Modal>
    </InstructorRoute>
  );
};

export default CourseEdit;
