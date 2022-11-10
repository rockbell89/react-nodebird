import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PostCard from "../../_components/PostCard";
import wrapper from "../../_store/configureStore";
import axios from "axios";
import USER_TYPE from "../../_types/user_types";
import { END } from "redux-saga";
import POST_TYPE from "../../_types/post_types";
import AppLayout from "../../_components/layout/AppLayout";
import Head from "next/head";

function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  useEffect(() => {
    console.log("id", id, router.query.id);

    return () => {};
  }, []);

  return (
    <>
      <AppLayout>
        <Head>
          <meta
            property="og:title"
            content={`${singlePost.User.nickname} 님의 게시글`}
          ></meta>
        </Head>
        {singlePost && (
          <PostCard post={singlePost} key={singlePost.id}></PostCard>
        )}
      </AppLayout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    const id = context.params.id;
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    // 유저정보
    context.store.dispatch({
      type: USER_TYPE.LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: POST_TYPE.GET_POST_REQUEST,
      data: {
        PostId: id,
      },
    });

    //  REQUEST => SUCCESS
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Post;
