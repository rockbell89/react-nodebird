import { useSelector } from "react-redux";
import PostCard from "../_components/PostCard";

const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <>
      {mainPosts &&
        mainPosts.map((post) => (
          <PostCard post={post} key={post.id}></PostCard>
        ))}
    </>
  );
};

export default Home;
