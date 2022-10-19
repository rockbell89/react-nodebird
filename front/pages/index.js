import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../_components/PostCard";
import PostForm from "../_components/PostForm";
import AppLayout from "../_components/layout/AppLayout";
import { Divider, List } from "antd";
import POST_TYPE from "../_types/post_types";
import USER_TYPE from "../_types/user_types";

const Home = () => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 600
      ) {
        if (hasMorePost && !loadPostLoading) {
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
  }, [hasMorePost, loadPostLoading]);

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
