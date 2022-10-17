import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../_components/PostCard";
import PostForm from "../_components/PostForm";
import AppLayout from "../_components/layout/AppLayout";
import { Divider, List } from "antd";
import POST_TYPE from "../_types/post_types";

const Home = () => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost, isLoading } = useSelector(
    (state) => state.post
  );
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch({
        type: POST_TYPE.LOAD_POST_REQUEST,
      });
    }

    return () => {};
  }, [isLoggedIn]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 600
      ) {
        if (hasMorePost && !isLoading) {
          dispatch({
            type: POST_TYPE.LOAD_POST_REQUEST,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, isLoading]);

  return (
    <>
      <AppLayout>
        <PostForm></PostForm>
        <Divider />
        <List
          header={`${mainPosts?.length} Posts`}
          itemLayout="horizontal"
          dataSource={mainPosts}
          renderItem={(post) => (
            <li>
              <PostCard post={post} key={post.id}></PostCard>
            </li>
          )}
        />

        <Divider />
      </AppLayout>
    </>
  );
};

export default Home;
