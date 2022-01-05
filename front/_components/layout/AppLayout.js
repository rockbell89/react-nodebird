import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
import { Input, Row, Col, Avatar, Card } from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import LoginForm from "../LoginForm";
import UserProfile from "../UserProfile";
import styled from "styled-components";
import { useEffect } from "react";

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  color: black;
`;

const IconButton = styled.div`
  display: inline-block;
  font-size: 20px;
  padding: 0 8px;
  cursor: pointer;
`;

const AppLayout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  // const isLoggedIn = true;

  if (isLoggedIn) {
    // 로그인 했을때
    return (
      <>
        <div className="py-10 border-bottom">
          <div className="container">
            <Row gutter={8} justify="space-between" align="middle">
              <Col span={8}>
                <Link href="/">
                  <a>
                    <Logo>BONGRAM</Logo>
                  </a>
                </Link>
              </Col>
              <Col span={8}>
                <Input.Search placeholder="# 태그" />
              </Col>
              <Col span={8}>
                <div className="right">
                  <Link href="/">
                    <IconButton>
                      <HomeOutlined />
                    </IconButton>
                  </Link>
                  <Link href="/posts">
                    <IconButton>
                      <PlusCircleOutlined />
                    </IconButton>
                  </Link>
                  <Link href="/likes">
                    <IconButton>
                      <HeartOutlined />
                    </IconButton>
                  </Link>
                  <Link href="/profile">
                    <IconButton>
                      <Avatar
                        src="https://joeschmoe.io/api/v1/random"
                        size="16"
                      />
                    </IconButton>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="py-40" style={{ backgroundColor: "#f0f0f0" }}>
          <div className="container">
            <Row gutter={24}>
              <Col xs={24} sm={8}>
                <UserProfile />
              </Col>
              <Col xs={24} sm={16}>
                <Card>
                  <div>{children}</div>
                </Card>
              </Col>

              <Col xs={24} sm={24}>
                <div className="center mt-40">Copyright(c) BONGRAM 2022 </div>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  } else {
    // 로그아웃 상태
    return (
      <>
        <Row
          className="py-40"
          style={{ backgroundColor: "#f5f5f5", height: "100vh" }}
          justify="center"
          align="middle"
        >
          <div className="container">
            <LoginForm />
          </div>
        </Row>
      </>
    );
  }
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
