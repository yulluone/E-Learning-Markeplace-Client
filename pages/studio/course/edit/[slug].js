import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { List, Avatar } from "antd";

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
<hr	/>
      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>{values && values.lessons && values.lessons.length} Lessons</h4>
          <List
            itemLayout="horizontal"
            dataSource={values && values.lessons}
            renderItem={(item, index) => (
              <Item>
                <Item.Meta
                  avatar={<Avatar>{index}</Avatar>}
                  title={item.title}
                ></Item.Meta>
              </Item>
            )}
          ></List>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default CourseEdit;
