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
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};

// reducer = 이전상태 + 액션 => 다음 상태
const postReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // LOAD POST
      case POST_TYPE.LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        break;

      case POST_TYPE.LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        // draft.mainPosts = generateDummyPost(10);
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePost = draft.mainPosts.length < action.data.length;

        break;

      case POST_TYPE.LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;

      // case POST_TYPE.LOAD_POST_RESET:
      //   draft.isLoading = false;
      //   draft.mainPosts = [];

      // ADD POST
      case POST_TYPE.ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        break;

      case POST_TYPE.ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        break;

      case POST_TYPE.ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.isError = action.error;
        break;

      // REMOVE POST
      case POST_TYPE.REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        break;

      case POST_TYPE.REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = state.mainPosts.filter(
          (post) => post.id !== action.data.PostId
        );
        break;

      case POST_TYPE.REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      // ADD COMMENT
      case POST_TYPE.ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        break;

      case POST_TYPE.ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find(
          (post) => post.id === action.data.PostId
        );
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }

      case POST_TYPE.ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      // LIKE POST
      case POST_TYPE.LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        break;

      case POST_TYPE.LIKE_POST_SUCCESS: {
        draft.likePostLoading = false;
        const post = draft.mainPosts.find(
          (post) => post.id === action.data.PostId
        );
        if (post) {
          post.Likers.push({ id: action.data.UserId });
        }
        draft.likePostDone = true;
        break;
      }
      case POST_TYPE.LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;

      // UNLIKE POST
      case POST_TYPE.UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        break;

      case POST_TYPE.UNLIKE_POST_SUCCESS: {
        draft.unlikePostLoading = false;
        const post = draft.mainPosts.find(
          (post) => post.id === action.data.PostId
        );
        if (post.Likers) {
          // post.Likers.filter((liker) => liker.id !== action.data.UserId);
          post.Likers.splice(post, 1);
        }
        draft.unlikePostDone = true;
        break;
      }
      case POST_TYPE.UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;

      default:
        break;
    }
  });
};

export default postReducer;
