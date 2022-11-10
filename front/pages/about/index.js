import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import wrapper from "../../_store/configureStore";
import USER_TYPE from "../../_types/user_types";
import styled from "styled-components";
import { Card, Avatar } from "antd";

const { Meta } = Card;
const TextWrapper = styled.div`
  text-align: center;
`;

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("userInfo", userInfo);
  }, []);

  return (
    <>
      {userInfo && (
        <Card
          actions={[
            <TextWrapper>
              게시글
              <br /> {userInfo.Posts}
            </TextWrapper>,
            <TextWrapper>
              팔로워
              <br /> {userInfo.Followers}
            </TextWrapper>,
            <TextWrapper>
              팔로잉
              <br /> {userInfo.Followings}
            </TextWrapper>,
          ]}
          style={{
            maxWidth: "300px",
            margin: "0 auto",
          }}
        >
          <Meta
            avatar={
              <Avatar
                size={60}
                src="https://joeschmoe.io/api/v1/random"
                style={{ border: "1px solid #dcdcdc" }}
              />
            }
            title={
              <div>
                <div>
                  {userInfo && (
                    <a href="/profile" style={{ color: "black" }}>
                      {userInfo.nickname ? userInfo.nickname : "GUEST"}{" "}
                      {userInfo.userId && <>({userInfo.userId})</>}
                    </a>
                  )}
                </div>
                <p
                  style={{
                    color: "gray",
                    fontSize: "12px",
                    verticalAlign: "middle",
                  }}
                >
                  {userInfo.email}
                </p>
              </div>
            }
            description={
              <div>
                <p>{userInfo.description}</p>
              </div>
            }
          />
        </Card>
      )}
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch({
    type: USER_TYPE.LOAD_USER_REQUEST,
    data: {
      UserId: 2,
    },
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default About;
