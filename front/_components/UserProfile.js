import styled from "styled-components";
import { Card, Avatar, Popover, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../_actions";
import { useEffect } from "react";
import { useRouter } from "next/router";

const { Meta } = Card;

const TextWrapper = styled.div`
  text-align: center;
`;

const PopoverMenuWrapper = styled.div`
  margin: -12px -16px;
`;

const PopoverMenu = styled.div`
  + div {
    border-top: 1px solid #dcdcdc;
  }
`;

const UserProfile = (props) => {
  const { user, logOutDone } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const onClickProfile = () => {
    router.push("/profile");
  };

  const onClickLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <>
      {user && (
        <Card
          actions={[
            <TextWrapper>
              게시글
              <br /> {user.Posts?.length}
            </TextWrapper>,
            <TextWrapper>
              팔로워
              <br /> {user.Followers?.length}
            </TextWrapper>,
            <TextWrapper>
              팔로잉
              <br /> {user.Followings?.length}
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
                  {user && (
                    <a href="/profile" style={{ color: "black" }}>
                      {user.nickname ? user.nickname : "GUEST"}{" "}
                      {user.userId && <>({user.userId})</>}
                    </a>
                  )}
                  <span>
                    <Popover
                      style={{ padding: 0 }}
                      content={
                        <PopoverMenuWrapper>
                          <PopoverMenu>
                            <Button type="text" onClick={onClickProfile} block>
                              프로필편집
                            </Button>
                          </PopoverMenu>
                          <PopoverMenu>
                            <Button type="text" onClick={onClickLogout} block>
                              로그아웃
                            </Button>
                          </PopoverMenu>
                        </PopoverMenuWrapper>
                      }
                    >
                      <SettingOutlined
                        style={{
                          color: "gray",
                          fontSize: "16px",
                          marginLeft: "8px",
                          verticalAlign: "middle",
                          cursor: "pointer",
                        }}
                      />
                    </Popover>
                  </span>
                </div>
                <p
                  style={{
                    color: "gray",
                    fontSize: "12px",
                    verticalAlign: "middle",
                  }}
                >
                  {user.email}
                </p>
              </div>
            }
            description={
              <div>
                <p>{user.description}</p>
              </div>
            }
          />
        </Card>
      )}
      {!user && (
        <Button type="text" onClick={onClickLogout} block>
          로그아웃
        </Button>
      )}
    </>
  );
};

export default UserProfile;
