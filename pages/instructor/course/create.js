import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../components/forms/courseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";

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
  const [image, setImage] = useState("");
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
        console.log(data);
        //set image in state
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image Upload failed. Try again later.");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <InstructorRoute>
      <h1 className=" jumbotron text-center square ">Create New Course</h1>
      <div className="pt-3 pb-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImage={handleImage}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CreateCourse;
