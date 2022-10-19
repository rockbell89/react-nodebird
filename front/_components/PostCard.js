import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Card, Popover, Button, Avatar, List, Comment } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import Link from "next/link";
import moment from "moment";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import POST_TYPE from "../_types/post_types";
import FollowButton from "./FollowButton";
import { removePostAction } from "../_actions/post_actions";

moment.locale("ko");

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const liked = post.Likers?.find((liker) => liker.id === user.id);

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdate = useCallback(() => {
    setEditMode(false);
  }, []);

  const onChangePost = useCallback(
    (editText) => () => {
      dispatch({
        type: POST_TYPE.UPDATE_POST_REQUEST,
        data: {
          PostId: post.id,
          content: editText,
        },
      });
    },
    [post]
  );

  const onLike = useCallback(() => {
    if (!user.id) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch({
      type: POST_TYPE.LIKE_POST_REQUEST,
      data: {
        PostId: post.id,
        UserId: user.id,
      },
    });
  }, [user.id]);
  const onUnlike = useCallback(() => {
    if (!user.id) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch({
      type: POST_TYPE.UNLIKE_POST_REQUEST,
      data: {
        PostId: post.id,
        UserId: user.id,
      },
    });
  }, [user.id]);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!user.id) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch(removePostAction(post.id));
  }, [user.id]);

  const onRetweet = useCallback(() => {
    if (!user.id) {
      return alert("로그인이 필요합니다.");
    }
    return dispatch({
      type: POST_TYPE.RETWEET_REQUEST,
      data: post.id,
    });
  }, [user.id]);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images?.[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onUnlike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {user.id && post.User?.id === user.id ? (
                  <>
                    {!post.RetweetId && (
                      <Button onClick={onClickUpdate}>수정</Button>
                    )}
                    <Button
                      type="danger"
                      loading={removePostLoading}
                      onClick={onRemovePost}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          post.RetweetId ? `${post.User?.nickname}님이 리트윗하셨습니다.` : null
        }
        extra={user.id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <div style={{ float: "right" }}>
              {moment(post.createdAt).format("YYYY.MM.DD")}
            </div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={
                <PostCardContent
                  content={post.Retweet.content}
                  onChangePost={onChangePost}
                  onCancelUpdate={onCancelUpdate}
                />
              }
            />
          </Card>
        ) : (
          <>
            <div style={{ float: "right" }}>
              {moment(post.createdAt).format("YYYY.MM.DD")}
            </div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.User?.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.User?.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User?.nickname}
              description={
                <PostCardContent
                  editMode={editMode}
                  onChangePost={onChangePost}
                  onCancelUpdate={onCancelUpdate}
                  content={post.content}
                />
              }
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments?.length} Comments`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User?.nickname}
                  datetime={moment(item.createdAt).fromNow()}
                  avatar={
                    <Link href={`/user/${item.User?.id}`} prefetch={false}>
                      <a>
                        <Avatar>{item.User?.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
