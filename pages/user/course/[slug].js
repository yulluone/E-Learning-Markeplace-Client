import { useRouter } from "next/router";


const UserCourseView = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <h1>{slug}</h1>;
};

export default UserCourseView;
