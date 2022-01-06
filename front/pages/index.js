import { useSelector } from "react-redux";
import PostCard from "../_components/PostCard";
import PostForm from "../_components/PostForm";

const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <>
      <PostForm></PostForm>
      {mainPosts &&
        mainPosts.map((post) => (
          <PostCard post={post} key={post.id}></PostCard>
        ))}
    </>
  );
};

export default Home;
