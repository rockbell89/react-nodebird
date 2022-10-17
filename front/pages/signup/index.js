import { useEffect, useState, useCallback } from "react";
import NonLayout from "../../_components/layout/NonLayout";
import Head from "next/head";
import { Input, Button, Form, Checkbox, Card } from "antd";
import useInput from "../../_hooks/useInput";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import USER_TYPE from "../../_types/user_types";

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
`;

const Signup = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const dispatch = useDispatch();

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      e.target.value !== password
        ? setPasswordError(true)
        : setPasswordError(false);
    },
    [password]
  );

  const onChangeTerm = useCallback(
    (e) => {
      setTerm(e.target.checked);
      setTermError(!e.target.checked);
    },
    [term]
  );

  const onSubmit = useCallback(() => {
    console.log("회원가입");

    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      console.log("term", term);
      setTermError(true);
    }

    console.log({ email, password, nickname });

    dispatch({
      type: USER_TYPE.SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [password, passwordCheck, term]);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <NonLayout>
        <Head>
          <title>회원가입 | TEST</title>
        </Head>
        <Card>
          <Form onFinish={onSubmit}>
            <div className="mt-20">
              <label htmlFor="user-email">이메일</label>
              <Input
                className="mt-10"
                name="user-email"
                value={email}
                type="email"
                required="required"
                onChange={onChangeEmail}
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
      </NonLayout>
    </>
  );
};

export default Signup;
