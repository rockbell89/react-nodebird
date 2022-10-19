import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const PostCardContent = ({ content }) => (
  <div>
    {content?.split(/(#[^\s#]+)/g).map((tag, index) => {
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
  content: PropTypes.string.isRequired,
};

export default PostCardContent;
