import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Row } from "antd";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export const NonLayout = ({ children }) => {
  return (
    <Row
      className="py-40"
      style={{ backgroundColor: "#f5f5f5", height: "100vh" }}
      justify="center"
      align="middle"
    >
      <div className="container">{children}</div>
    </Row>
  );
};

NonLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NonLayout;
