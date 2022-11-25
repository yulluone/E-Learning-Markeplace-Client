import { Button, Progress, Switch } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import ReactPlayer from "react-player";

const UpdateLessonForm = ({
  current,
  setCurrent,
  handleUpdateLesson,
  uploading,
  uploadVideoButtonText,
  handleVideo,
  progress,
}) => {
  return (
    <div className="container pt-3">
      {/* <pre>{JSON.stringify(current)}</pre> */}
      <form onSubmit={handleUpdateLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setCurrent({ ...current, title: e.target.value })}
          value={current.title}
          placeholder="Title"
          autoFocus
          required
        ></input>
        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setCurrent({ ...current, content: e.target.value })}
          value={current.content}
          placeholder="Content"
        ></textarea>
      </form>

      {!uploading && current.video && current.video.Location && (
        <div className="pt-2 d-flex justify-content-center ">
          <ReactPlayer
            url={current.video.Location}
            width="410 px"
            height="240px"
            controls
          />
        </div>
      )}

      <div >
        <span className="pt-3 badge ">preview toggle</span>
        <Switch
          className="float-right mt-2"
          disabled={uploading}
          checked={current.free_preview}
          name="free_preview"
          onChange={(v) => setCurrent({ ...current, free_preview: v })}
        />
      </div>

      <div className="d-flex justify-content-center">
        <label className="btn btn-dark btn-block text-lft mt-3">
          {current.video ? "Replace Current Video" : uploadVideoButtonText }
          <input type="file" accept="video/*" hidden onChange={handleVideo} />
        </label>
      </div>

      {progress > 0 && (
        <Progress
          className="d-flex justify-content-center"
          percent={progress}
          steps={10}
        />
      )}
      <Button
        onClick={handleUpdateLesson}
        className="col mt-3"
        size="large"
        type="primary"
        loading={uploading}
        block
        shape="round"
      >
        Save
      </Button>
    </div>
  );
};

export default UpdateLessonForm;
