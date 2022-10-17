import POST_TYPE from "../../_types/post_types";
import shortId from "shortid";
import produce from "immer";
import faker from "faker";

const initialState = {
  mainPosts: [],
  imagePaths: [],
  isLoading: false,
  isComplete: false,
  isError: null,
  hasMorePost: true,
};

const dummyPost = (data) => ({
  id: data.id,
  User: {
    id: 1,
    userId: "rockbell89",
    nickname: "록벨",
  },
  content: data.content,
  Images: [
    {
      src: "https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg",
      fileName: "고양이",
    },
  ],
  Comments: [],
});

// faker posts
export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map((post, index) => ({
      id: shortId.generate(),
      User: {
        id: index++,
        userId: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: `#해시태그 #인스타그램 ${faker.lorem.paragraph()}`,
      Images: [
        {
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          User: {
            id: index++,
            userId: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

const dummyComment = (data) => ({
  id: shortId.generate(),
  User: {
    id: 1,
    userId: "rockbell89",
    nickname: "록벨",
  },
  content: data,
});

// reducer = 이전상태 + 액션 => 다음 상태
const postReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // LOAD POST
      case POST_TYPE.LOAD_POST_REQUEST:
        draft.isLoading = true;
        draft.isComplete = false;
        break;

      case POST_TYPE.LOAD_POST_SUCCESS:
        draft.isLoading = false;
        // draft.mainPosts = generateDummyPost(10);
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePost = draft.mainPosts.length < 50;
        draft.isComplete = true;
        break;

      case POST_TYPE.LOAD_POST_FAILURE:
        draft.isLoading = false;
        draft.isError = action.error;
        break;

      // ADD POST
      case POST_TYPE.ADD_POST_REQUEST:
        draft.isLoading = true;
        break;

      case POST_TYPE.ADD_POST_SUCCESS:
        draft.isLoading = false;
        draft.isComplete = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;

      case POST_TYPE.ADD_POST_FAILURE:
        draft.isLoading = false;
        draft.isError = action.error;
        break;

      // REMOVE POST
      case POST_TYPE.REMOVE_POST_REQUEST:
        draft.isLoading = true;
        break;

      case POST_TYPE.REMOVE_POST_SUCCESS:
        draft.mainPosts = state.mainPosts.filter(
          (post) => post.id !== action.data.id
        );
        break;

      case POST_TYPE.REMOVE_POST_FAILURE:
        draft.isLoading = false;
        draft.isError = action.error;
        break;

      // ADD COMMENT
      case POST_TYPE.ADD_COMMENT_REQUEST:
        draft.isLoading = true;
        break;

      case POST_TYPE.ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find(
          (post) => post.id === action.data.postId
        );
        post.Comments.unshift(dummyComment(action.data.content));
        draft.isLoading = false;
        draft.isComplete = true;
        break;
      }

      case POST_TYPE.ADD_COMMENT_FAILURE:
        draft.isLoading = false;
        draft.isError = action.error;
        break;

      default:
        break;
    }
  });
};

export default postReducer;
