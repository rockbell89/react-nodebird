import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

const FollowButton = ({ post }) => {
  return (
    <Button size="small">
      <small>팔로우</small>
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
