import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../_components/PostCard";
import PostForm from "../_components/PostForm";
import AppLayout from "../_components/layout/AppLayout";
import { Divider, List } from "antd";
import POST_TYPE from "../_types/post_types";
import USER_TYPE from "../_types/user_types";
import wrapper from "../_store/configureStore";
import { END } from "redux-saga";
import axios from "axios";

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

// front server
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    // 실행된 결과는 HYDRATE 로..

    // 유저정보
    context.store.dispatch({
      type: USER_TYPE.LOAD_MY_INFO_REQUEST,
    });
    // 게시글 정보
    context.store.dispatch({
      type: POST_TYPE.LOAD_POST_REQUEST,
    });

    //  REQUEST => SUCCESS
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
