import { useState, useEffect } from "react";
import { Select, Button, Avatar, Badge } from "antd";

const { Option } = Select;

const CourseCreateForm = ({
  handleSubmit,
  handleChange,
  handleImage,
  handleImageRemove,
  values,
  setValues,
  preview,
  uploadButtonText,
  editPage = false,
}) => {
  const children = [];
  for (let i = 999; i <= 9999; i += 200) {
    children.push(<Option key={i.toFixed(2)}>Ksh {i.toFixed(2)}</Option>);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="category"
          className="form-control"
          placeholder="Category"
          value={values.category}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <textarea
          name="description"
          cols="7"
          rows="7"
          className="form-control"
          value={values.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <Select
              style={{ width: "100%" }}
              size="large"
              value={values.paid}
              onChange={(v) => setValues({ ...values, paid: v, price: 0 })}
            >
              <Option value={true}>Paid</Option>
              <Option value={false}>Free</Option>
            </Select>
          </div>
        </div>

        {values.paid && (
          <div className="form-group">
            <Select
              defaultValue="Ksh 999"
              style={{ width: "100%" }}
              size="large"
              onChange={(v) => setValues({ ...values, price: v })}
            >
              {children}
            </Select>
          </div>
        )}
      </div>

      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <label className="btn btn-outline-secondary btn-block text-left">
              {uploadButtonText}
              (
              <input
                type="file"
                name="image"
                onChange={handleImage}
                accept="image/*"
                disabled={values.loading}
                hidden
              />
              )
            </label>
          </div>
        </div>

        {preview && (
          <Badge
            count="X"
            onClick={values.loading ? undefined : handleImageRemove}
          >
            <Avatar width={200} src={preview} />
          </Badge>
        )}

        {editPage && values.image && (
          // <pre> {JSON.stringify(values.image)}</pre>

          <Avatar
            size={40}
            src={`https://ipfs.filebase.io/ipfs/${values.image.cid}`}
          />
        )}
      </div>

      <div className="row">
        <div className="col">
          <Button
            onClick={handleSubmit}
            disabled={values.loading || values.uploading}
            className="btn btn-primary"
            loading={values.loading}
            type="primary"
            size="large"
            shape="round"
          >
            {values.loading ? "Saving..." : "Save & Continue"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CourseCreateForm;
