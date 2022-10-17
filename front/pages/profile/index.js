import FollowList from "../../_components/FollowList";
import NickNameEditForm from "../../_components/NickNameEditForm";
import AppLayout from "../../_components/layout/AppLayout";
const Profile = () => {
  const data = [{ title: "aaa" }, { title: "bbb" }, { title: "ccc" }];
  return (
    <>
      <AppLayout>
        <NickNameEditForm></NickNameEditForm>
        <FollowList data={data} header="Followers"></FollowList>
        <FollowList data={data} header="Following"></FollowList>
      </AppLayout>
    </>
  );
};

export default Profile;
