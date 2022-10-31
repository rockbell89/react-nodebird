import React, { useRef, useCallback, useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addPostAction } from "./../_actions/post_actions";
import USER_TYPE from "../_types/user_types";
import POST_TYPE from "../_types/post_types";

const PostForm = () => {
  const { user } = useSelector((state) => state.user);
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const imageInput = useRef();

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }

    return () => {};
  }, [addPostDone]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
    console.log(imageInput.current);
  }, [imageInput.current]);

  const onChangeText = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [text]
  );

  const onSubmit = useCallback(() => {
    const formData = new FormData();
    imagePaths.forEach((image) => {
      formData.append("image", image);
    });
    formData.append("content", text);

    dispatch(addPostAction(formData));
  }, [text, imagePaths]);

  const onChangeImages = useCallback((e) => {
    const imageData = new FormData();
    console.log("imageData", imageData);
    [].forEach.call(e.target.files, (file) => {
      // Array.prototype.forEach.call
      imageData.append("image", file);
      console.log("file", file);
    });
    dispatch({
      type: POST_TYPE.UPLOAD_IMAGES_REQUEST,
      data: imageData,
    });
  });

  const onRemoveImage = useCallback((index) => {
    dispatch({
      type: POST_TYPE.REMOVE_IMAGE,
      data: index,
    });
  }, []);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div style={{ marginTop: "8px" }}>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button size="medium" onClick={onClickImageUpload}>
          이미지 업로드
        </Button>
        <Button
          size="medium"
          type="primary"
          style={{ float: "right" }}
          htmlType="submit"
          disabled={!text.length}
        >
          작성 완료
        </Button>
      </div>
      <div>
        {imagePaths &&
          imagePaths.map((fileName, index) => {
            return (
              <div key={fileName} style={{ display: "inline-block" }}>
                <img
                  src={"http://localhost:3065/" + fileName}
                  style={{ width: "200px" }}
                  alt={fileName}
                />
                <div>
                  <Button onClick={() => onRemoveImage(index)}>제거</Button>
                </div>
              </div>
            );
          })}
      </div>
    </Form>
  );
};

export default PostForm;
