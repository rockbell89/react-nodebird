import { Button, Form, Input } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommentAction } from "../_actions/post_actions";
import PropTypes from "prop-types";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.user?.id);
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  const onChangeCommentText = useCallback(
    (e) => {
      setCommentText(e.target.value);
    },
    [commentText]
  );

  const onSubmitComment = useCallback(() => {
    dispatch(
      addCommentAction({
        content: commentText,
        postId: post.id,
        userId: id,
      })
    );
  }, [commentText]);

  return (
    <Form onFinish={onSubmitComment} encType="multipart/form-data">
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          rows={4}
          value={commentText}
          onChange={onChangeCommentText}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40, zIndex: 2 }}
          type="primary"
          htmlType="submit"
        >
          댓글 작성
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
