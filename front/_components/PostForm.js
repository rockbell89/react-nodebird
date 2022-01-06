import React, { useRef, useCallback, useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addPostAction } from "./../_actions/post_actions";

const PostForm = () => {
  const { imagePaths, postAdded } = useSelector((state) => state.post);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
    console.log("imageInput.current", imageInput.current);
  }, [imageInput.current]);

  useEffect(() => {
    if (postAdded) {
      setText("");
    }
  }, [postAdded]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    console.log("upload post");
    dispatch(addPostAction());
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
        <input type="file" multiple hidden ref={imageInput} />
        <Button size="medium" onClick={onClickImageUpload}>
          이미지 업로드
        </Button>
        <Button
          size="medium"
          type="primary"
          style={{ float: "right" }}
          htmlType="submit"
        >
          작성 완료
        </Button>
      </div>
      <div>
        {imagePaths &&
          imagePaths.map((fileName) => {
            return (
              <div key={fileName} style={{ display: "inline-block" }}>
                <img
                  src={"http://localhost:3000/" + fileName}
                  style={{ width: "200px" }}
                  alt={fileName}
                />
                <div>
                  <Button>제거</Button>
                </div>
              </div>
            );
          })}
      </div>
    </Form>
  );
};

export default PostForm;
