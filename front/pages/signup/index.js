import { useEffect, useState, useCallback } from "react";
import AppLayout from "../../_components/AppLayout";
import Head from "next/head";
import { Input, Button, Form, Checkbox, Card } from "antd";
import useInput from "../../_hooks/useInput";
import styled from "styled-components";

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
`;

const Signup = () => {
  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      e.target.value !== password
        ? setPasswordError(true)
        : setPasswordError(false);
      console.log(e.target.value + "===" + password);
    },
    [password]
  );

  const onChangeTerm = useCallback(
    (e) => {
      setTerm(e.target.checked);
      console.log(e.target.checked);
      setTermError(!e.target.checked);
    },
    [term]
  );

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <Card>
        <Form onFinish={onSubmit}>
          <div className="mt-20">
            <label htmlFor="user-id">아이디</label>
            <Input
              className="mt-10"
              name="user-id"
              value={id}
              required="required"
              onChange={onChangeId}
            ></Input>
          </div>
          <div className="mt-20">
            <label htmlFor="user-nickname">닉네임</label>
            <Input
              className="mt-10"
              name="user-nickname"
              value={nickname}
              required="required"
              onChange={onChangeNickname}
            ></Input>
          </div>
          <div className="mt-20">
            <label htmlFor="user-password">비밀번호</label>
            <Input.Password
              className="mt-10"
              name="user-password"
              type="password"
              value={password}
              required="required"
              onChange={onChangePassword}
            ></Input.Password>
          </div>
          <div className="mt-20">
            <label htmlFor="user-password-check">비밀번호 확인</label>
            <Input.Password
              className="mt-10"
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required="required"
              onChange={onChangePasswordCheck}
            ></Input.Password>
          </div>
          <div className="mt-20">
            {passwordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
            )}
          </div>
          <div className="right mt-20">
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              회원가입에 동의합니다.
            </Checkbox>
            {termError && (
              <ErrorMessage>회원가입 약관에 동의는 필수 입니다.</ErrorMessage>
            )}
          </div>
          <div className="center mt-20">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              disabled={
                !password ||
                !passwordCheck ||
                !term ||
                passwordError ||
                termError
              }
            >
              회원가입
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default Signup;
