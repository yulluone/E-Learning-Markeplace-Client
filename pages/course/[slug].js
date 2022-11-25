import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Modal } from "antd";
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import SingleCourseLessons from "../../components/cards/SingleCourseLessons";
import ReactPlayer from "react-player";
const SingleCourse = () => {
	
  const router = useRouter();
  const { slug } = router.query;

  const [course, setCourse] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchCourse();
  }, [slug]);

  const fetchCourse = async () => {
    if (!slug) return;
    try {
      const { data } = await axios.get(`/auth/course/${slug}`);
      setCourse(data);
    } catch (err) {
      console.log(err);
    }
	};
	
	const handleFreeEnrollment = async () => {
    console.log("freeEnrollment");
  };

	const handlePaidEnrollment = async () => { 
 console.log("paidEnrollment")
	}

  return (
    <>
      <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        setPreview={setPreview}
        handleFreeEnrollment={handleFreeEnrollment}
        handlePaidEnrollment={handlePaidEnrollment}
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
