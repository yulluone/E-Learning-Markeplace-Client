import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import router from "next/router";

const CreateCourse = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "999",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Image Upload");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
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
      setUploadButtonText("Image Upload");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/instructor/course", {
        ...values,
        image,
      });
      toast("Great! Now you can start adding lessons");
      router.push("/studio");
    } catch (err) {
      toast(err.response.data);
    }

    //send course info and image info to backend
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
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(image, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CreateCourse;
