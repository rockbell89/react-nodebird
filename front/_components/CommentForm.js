import { Button, Form, Input } from "antd";
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommentAction } from "../_actions/post_actions";
import PropTypes from "prop-types";
import POST_TYPE from "../_types/post_types";

const CommentForm = ({ post }) => {
  const { user } = useSelector((state) => state.user);
  const { addCommentDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
    return () => {};
  }, [addCommentDone]);

  const onChangeCommentText = useCallback(
    (e) => {
      setCommentText(e.target.value);
    },
    [commentText]
  );

  const onSubmitComment = useCallback(() => {
    dispatch(
      addCommentAction({
        User: user,
        content: commentText,
        PostId: post.id,
        UserId: user.id,
      })
    );
  }, [commentText, user.id]);

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
