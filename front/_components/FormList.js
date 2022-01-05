import React from "react";
import { List, Card, Divider, Button } from "antd";
function FormList({ data, header }) {
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
}

export default FormList;
