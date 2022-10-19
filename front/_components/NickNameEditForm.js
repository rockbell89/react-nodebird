import React, { useCallback, useEffect } from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import USER_TYPE from "../_types/user_types";
import useInput from "../_hooks/useInput";

function NickNameEditForm() {
  const dispatch = useDispatch();
  const [nickname, onChangeNickname, setNickname] = useInput("");
  const { changeNicknameDone, changeNicknameError, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (changeNicknameDone) {
      setNickname("");
      alert("닉네임이 성공적으로 변경되었습니다");
    }
  }, [changeNicknameDone]);

  useEffect(() => {
    if (changeNicknameError) {
      alert(changeNicknameError);
    }
  }, [changeNicknameError]);

  const onSubmit = useCallback(() => {
    if (user.nickname === nickname) return alert("기존 닉네임과 동일합니다");
    dispatch({
      type: USER_TYPE.CHANGE_NICKNAME_REQUEST,
      data: {
        nickname,
      },
    });
  }, [nickname]);

  return (
    <div>
      <Input.Search
        addonBefore="닉네임"
        enterButton="수정"
        value={nickname}
        onChange={onChangeNickname}
        onSearch={onSubmit}
      />
    </div>
  );
}

export default NickNameEditForm;
