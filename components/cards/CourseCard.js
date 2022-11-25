import { Card, Badge } from "antd";
import Link from "next/link";

const { Meta } = Card;

const CourseCard = ({ course }) => {
  // destructure
  const { name, slug, price, description, category, image, paid, instructor } =
    course;

  return (
    <Link href={`/course/${slug}`}>
      <Card
        hoverable
        className="mb-4 m-2"
        cover={
          <img
            src={`https://ipfs.filebase.io/ipfs/${image.cid}`}
            alt={name}
										style={{
              height: "250px",
              objectFit: "cover",
              borderRadius: "20px",
            }}
            className="p-1"
          />
        }
        style={{ width: 300, borderRadius: "20px" }}
      >
        {/* <h2 className="font-weight-bold">{name}</h2> */}
        <Meta
          className="font-weight-bold"
          title={name}
          description={
            <div className=" ml-1">
              <p className="mr-2">by {instructor.name}</p>
              <Badge count={category} className="pb-2 mr-2" />
            </div>
          }
        />
        <p className="pt-2">{paid ? "KES." + price : "Free"}</p>
      </Card>
    </Link>
  );
};

export default CourseCard;
