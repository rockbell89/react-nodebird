import React, { useState, useCallback, useEffect } from "react";
import { Card, Form, Input, Checkbox, Button, Divider, Row, Col } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../_actions/index";
import { useForm } from "antd/lib/form/Form";

const Logos = styled.div`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 20px;
`;

function LoginForm() {
  const [form] = useForm();
  const [email] = useState("");
  const [password] = useState("");
  const [remember, setRemeber] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const { isError } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      alert(isError);
    }
  }, [isError]);

  const onValuesChange = useCallback((changedValue, values) => {
    // console.log("changedValue", changedValue);
    // console.log("values", values);
  }, []);

  const onChangeRemember = useCallback((e) => {
    setRemeber(e.target.checked);
  });

  const onFieldsChange = useCallback(() => {
    const { email, password } = form.getFieldValue();
    const hasErrors = form.getFieldsError().some(({ errors }) => {
      errors.length > 0;
    });

    email && password ? setDisabledButton(hasErrors) : setDisabledButton(true);
  }, []);

  const onFinish = useCallback((values) => {
    dispatch(loginAction(values));
  }, []);

  const onFinishFailed = useCallback((errorInfo) => {
    console.log("Failed:", errorInfo);
  }, []);

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <Card>
        <Form
          form={form}
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          onFieldsChange={onFieldsChange}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="아이디"
            name="email"
            rules={[
              {
                required: true,
                message: "아이디를 입력해주세요",
              },
            ]}
            value={email}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력해주세요",
              },
            ]}
            value={password}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox checked={remember} onChange={onChangeRemember}>
              로그인정보 기억하기
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              disabled={disabledButton}
            >
              로그인
            </Button>
          </Form.Item>
          <Divider style={{ margin: "12px 0" }}></Divider>
          <div className="py-10">
            <Row justify="space-between">
              <Col>
                <p style={{ margin: "0" }}>아직 회원이 아니신가요?</p>
              </Col>
              <Col>
                <Link href="/signup">회원가입</Link>
              </Col>
            </Row>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default LoginForm;
