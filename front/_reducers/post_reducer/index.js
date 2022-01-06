import POST_TYPE from "../../_types/post_types";
const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "rockbell89",
      },
      content: "첫번째 게시글 입니다 #해시태그 #인스타그램",
      Images: [
        {
          src: "https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg",
          fileName: "고양이",
        },
        {
          src: "https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg",
          fileName: "고양이",
        },
        {
          src: "https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg",
          fileName: "고양이",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const dummyPost = {
  id: 2,
  User: {
    id: 2,
    nickname: "joseph91",
  },
  content: "두번째 게시글 입니다 #해시태그 #인스타그램",
  Images: [
    {
      src: "https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg",
      fileName: "고양이",
    },
  ],
};

// 이전상태 + 액션 => 다음 상태
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPE.ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };

    default:
      return { ...state };
  }
};

export default postReducer;
