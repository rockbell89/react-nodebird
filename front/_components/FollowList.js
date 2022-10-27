import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { List, Card, Divider, Button } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import USER_TYPE from "../_types/user_types";

const FollowList = ({ data, header }) => {
  const dispatch = useDispatch();
  const onClickUnFollow = useCallback((id) => {
    if (header === "Following") {
      dispatch({
        type: USER_TYPE.UNFOLLOW_REQUEST,
        data: {
          UserId: id,
        },
      });
    } else {
      dispatch({
        type: USER_TYPE.REMOVE_FOLLOWER_REQUEST,
        data: {
          UserId: id,
        },
      });
    }
  }, []);

  return (
    <div>
      <Divider>{header}</Divider>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={`${item.nickname} ${item.id}`}
              actions={[
                <StopOutlined
                  key="stop"
                  onClick={() => onClickUnFollow(item.id)}
                ></StopOutlined>,
              ]}
            ></Card>
          </List.Item>
        )}
        loadMore={
          <div className="center">
            <Button>더 보기</Button>
          </div>
        }
      />
    </div>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default FollowList;
