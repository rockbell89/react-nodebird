import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((tag, index) => {
      if (tag.match(/(#[^\s]+)/)) {
        return (
          <Link
            href={{ pathname: "/hashtag", query: { tag: tag.slice(1) } }}
            as={`/hashtag/${tag.slice(1)}`}
            key={index}
          >
            <a>{tag}</a>
          </Link>
        );
      }
      return tag;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
