import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={`http://localhost:3065/${images[0].src}`}
          alt={`http://localhost:3065/${images[0].src}`}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <img
            role="presentation"
            src={`http://localhost:3065/${images[0].src}`}
            alt={`http://localhost:3065/${images[0].src}`}
            width="50%"
            onClick={onZoom}
          />
          <img
            role="presentation"
            src={`http://localhost:3065/${images[1].src}`}
            alt={`http://localhost:3065/${images[1].src}`}
            width="50%"
            onClick={onZoom}
          />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  } else {
    return (
      <>
        <div style={{ backgroundColor: "#f0f0f0" }}>
          <img
            role="presentation"
            src={`http://localhost:3065/${images[0].src}`}
            alt={`http://localhost:3065/${images[0].src}`}
            width={images.length > 1 ? "50%" : "100%"}
            onClick={onZoom}
          />
          {images.length > 1 && (
            <div
              role="presentation"
              style={{
                display: "inline-block",
                width: "50%",
                textAlign: "center",
                verticalAlign: "middle",
              }}
              onClick={onZoom}
            >
              <PlusOutlined />
              <br />
              {images.length - 1}
              개의 사진 더보기
            </div>
          )}
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    })
  ).isRequired,
};

export default PostImages;
