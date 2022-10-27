import { useEffect } from "react";
import FollowList from "../../_components/FollowList";
import NickNameEditForm from "../../_components/NickNameEditForm";
import AppLayout from "../../_components/layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import USER_TYPE from "../../_types/user_types";
const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: USER_TYPE.LOAD_FOLLOWERS_REQUEST,
    });

    dispatch({
      type: USER_TYPE.LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

  return (
    <>
      <AppLayout>
        <NickNameEditForm></NickNameEditForm>
        <FollowList data={user?.Followers} header="Followers"></FollowList>
        <FollowList data={user?.Followings} header="Following"></FollowList>
      </AppLayout>
    </>
  );
};

export default Profile;
