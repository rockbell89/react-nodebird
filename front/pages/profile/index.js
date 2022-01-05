import FormList from "../../_components/FormList";
import NickNameEditForm from "../../_components/NickNameEditForm";
const Profile = () => {
  const data = [{ title: "aaa" }, { title: "bbb" }, { title: "ccc" }];
  return (
    <>
      <NickNameEditForm></NickNameEditForm>
      <FormList data={data} header="Followers"></FormList>
      <FormList data={data} header="Following"></FormList>
    </>
  );
};

export default Profile;
