import styled, { createGlobalStyle } from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  text-align: center;
  overflow-y: scroll;
  padding: 0 40px;

  header {
    button {
      position: absolute;
      right: 16px;
      top: 16px;
      z-index: 4999;
    }
  }
`;

export const ImgWrapper = styled.div`
  padding: 32px;
  text-align: center;
  img {
    display: inline-block;
    max-heighit: 700px;
  }
`;

export const Global = createGlobalStyle`
.slick-slide {
    display:inline-block;
}
.ant-card-cover {
    transform: none !important;
}
`;
