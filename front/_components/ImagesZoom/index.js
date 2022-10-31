import React, { useState } from "react";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Overlay, Global, ImgWrapper } from "./style";

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <header>
        <h1>상세이미지</h1>
        <button onClick={onClose}>닫기</button>
      </header>
      <div>
        <div>
          <Slick
            initialSlide={0}
            infinite
            slidesToShow={1}
            slidesToScroll={1}
            afterChange={(slide) => setCurrentSlide(slide)}
          >
            {images.map((item) => (
              <ImgWrapper key={item.src}>
                <img
                  src={`http://localhost:3065/${item.src}`}
                  alt={`http://localhost:3065/${item.src}`}
                ></img>
              </ImgWrapper>
            ))}
          </Slick>
        </div>
      </div>
    </Overlay>
  );
};

export default ImagesZoom;
