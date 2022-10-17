import React from "react";
import PropTypes from "prop-types";
import { List, Card, Divider, Button } from "antd";

const FollowList = ({ data, header }) => {
  return (
    <div>
      <Divider>{header}</Divider>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>Card content</Card>
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
  data: PropTypes.string.isRequired,
};

export default FollowList;
