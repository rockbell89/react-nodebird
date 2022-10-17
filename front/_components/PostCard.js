import React, { useState, useCallback } from "react";
import { Card, Button, Avatar, Popover, List, Comment } from "antd";
import PropTypes from "prop-types";
import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removePostAction } from "../_actions/post_actions";

import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import PostImages from "./PostImages";
import FollowButton from "./FollowButton";
import USER_TYPE from "../_types/user_types";

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const userId = useSelector((state) => state.user.user?.id);

  const [liked, setLiked] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch(removePostAction(post.id));
    dispatch({
      type: USER_TYPE.REMOVE_POST_OF_ME,
      data: {
        id: post.id,
      },
    });
  }, []);

  return (
    <CardWrapper key={post.id}>
      <Card
        cover={
          post.Images && post.Images[0] && <PostImages images={post.Images} />
        }
        title={
          <Card.Meta
            avatar={<Avatar>{post.User?.nickname[0].toUpperCase()}</Avatar>}
            title={
              <div>
                <span style={{ marginRight: "8px" }}>
                  {post.User?.nickname}
                </span>
              </div>
            }
          />
        }
        extra={<FollowButton post={post} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {userId && post.User?.id === userId ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>
                    신고 {post.User?.id} === {userId}
                  </Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <PostCardContent postData={post.content} />
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments?.length} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link
                      href={{ pathname: "/user", query: { id: item.User.id } }}
                      as={`/user/${item.User.id}`}
                    >
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </CardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number | PropTypes.string,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default PostCard;
