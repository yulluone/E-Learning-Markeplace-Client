import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Modal } from "antd";
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import SingleCourseLessons from "../../components/cards/SingleCourseLessons";
import ReactPlayer from "react-player";
import { Context } from "../../context";
import { toast } from "react-toastify";

const SingleCourse = () => {
  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();
  const { slug } = router.query;

  const [course, setCourse] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [mpesaNumber, setMpesaNumber] = useState("");

  useEffect(() => {
    fetchCourse();
  }, [slug]);

  const fetchCourse = async () => {
    if (!slug) return;
    try {
      const { data } = await axios.get(`/auth/course/${slug}`);
      setCourse(data.course);
      setEnrolled(data.enrolled);
    } catch (err) {
      console.log(err);
    }
  };

  // const checkEnrollment = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       `/auth/check-enrollment/${course && course._id}`
  //     );
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleFreeEnrollment = async () => {
    try {
      //check if user is logged in
      if (!user) return router.push("/login");

      //check if already enrolled
      if (enrolled) return router.push(`/user/course/${course.slug}`);

      setLoading(true);
      const { data } = await axios.post(`/auth/free-enrollment/${course.slug}`);
      setLoading(false);
      toast(data.message);
      router.push(`/user/course/${course.slug}`);
    } catch (err) {
      console.group(err);
      setLoading(false);
      toast("Oops! Failed to enroll. Try again.");
    }
  };

  const handlePaidEnrollment = async () => {
    try {
      if (enrolled) return router.push(`/user/course/${course.slug}`);

      setLoading(true);
      const { data } = await axios.post(
        `/auth/paid-enrollment/${course.slug}`,
        {
          mpesaNumber,
          price: course.price,
        }
      );
      console.log(data);
      const result = window.confirm(
        `${data}	Click OK after receiving confirmation message.`
      );
      setLoading(false);
      if (!result) return;
      router.reload();
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast("Enrollment attempt failed. Try again.");
    }
  };

  return (
    <>
      <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        setPreview={setPreview}
        handleFreeEnrollment={handleFreeEnrollment}
        handlePaidEnrollment={handlePaidEnrollment}
        loading={loading}
        user={user}
        enrolled={enrolled}
        setMpesaNumber={setMpesaNumber}
        mpesaNumber={mpesaNumber}
      />
      {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
      <SingleCourseLessons
        lessons={course.lessons}
        setPreview={setPreview}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Modal
        title="Free preview"
        centered
        visible={showModal}
        onCancel={() => setShowModal(!showModal)}
        footer={null}
      >
        <ReactPlayer url={preview} controls width="410 px" height="240px" />
      </Modal>
    </>
  );
};

export default SingleCourse;
