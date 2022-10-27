import React, { useCallback } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import USER_TYPE from "../_types/user_types";

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const isFollowing =
    user &&
    user?.Followings.find((following) => following.id === post.User?.id);
  const onClickFollow = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: USER_TYPE.UNFOLLOW_REQUEST,
        data: {
          UserId: post.User?.id,
        },
      });
    } else {
      dispatch({
        type: USER_TYPE.FOLLOW_REQUEST,
        data: {
          UserId: post.User?.id,
        },
      });
    }
  }, [isFollowing]);

  return (
    post.User?.id !== user.id && (
      <Button
        size="small"
        onClick={onClickFollow}
        type={!isFollowing ? "primary" : ""}
      >
        <small>{!isFollowing ? "팔로우" : "팔로잉"}</small>
      </Button>
    )
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
