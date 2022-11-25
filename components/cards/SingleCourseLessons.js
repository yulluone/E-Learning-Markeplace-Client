import { List } from "antd";
import { Avatar } from "antd";

const SingleCourseLessons = ({
  lessons,
  setShowModal,
  showModal,
  setPreview,
}) => {
  const { Item } = List;
  return (
    <div class="container">
      <div class="row">
        <div class="col lesson-list">
          {/* <pre>{JSON.stringify(lessons, null, 4)}</pre> */}
          <h4>{lessons && lessons.length} Lessons</h4>
          <List
            itemLayout="horizontal"
            dataSource={lessons}
            renderItem={(item, index) => (
              <Item>
                <Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                />
                {item.video && item.video.Location && item.free_preview && (
                  <span
                    className="text-primary pointer"
                    onClick={() => {
                      setPreview(item.video.Location);
                      setShowModal(!showModal);
                    }}
                  >
                    preview
                  </span>
                )}
              </Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCourseLessons;
