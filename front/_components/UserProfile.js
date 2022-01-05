import styled from "styled-components";
import { Card, Avatar, Popover, List, Button, Divider } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
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

const user = {
  id: 1,
  nickname: "rockbell89",
  description: "요즘 취미는 코딩",
};

function UserProfile(props) {
  // const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    return () => {};
  }, [user]);

  const onClickProfile = () => {
    router.push("/profile");
  };

  const onClickLogout = () => {
    console.log("logout");
    dispatch(logoutAction());
    router.push("/");
  };
  return (
    <>
      {user && (
        <Card
          actions={[
            <TextWrapper>
              게시글
              <br />0
            </TextWrapper>,
            <TextWrapper>
              팔로워
              <br />0
            </TextWrapper>,
            <TextWrapper>
              팔로잉
              <br />0
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
                <a href="/profile" style={{ color: "black" }}>
                  {user.nickname}
                </a>
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
            }
            description={
              <div>
                <p>{user.description}</p>
              </div>
            }
          />
        </Card>
      )}
    </>
  );
}

export default UserProfile;
