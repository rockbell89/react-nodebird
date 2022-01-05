import React from "react";
import { Form, Input } from "antd";

function NickNameEditForm() {
  return (
    <div>
      <Form>
        <Input.Search addonBefore="닉네임" enterButton="수정" />
      </Form>
    </div>
  );
}

export default NickNameEditForm;
