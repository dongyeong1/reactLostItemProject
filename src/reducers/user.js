import { BranchesOutlined } from "@ant-design/icons";
import produce from "immer";

export const initialState = {
    // user: {
    //     id: 1,
    //     name: "김동영",
    //     email: "dong@dong",
    //     nickname: "dongyeong",
    //     notification: [
    //         {
    //             id: 1,
    //             message: "메세지가 도착했습니다",
    //             type: "chat",
    //             read: false,
    //         },
    //         {
    //             id: 2,
    //             message: "거래가 성사되었습니다",
    //             type: "trade",
    //             read: false,
    //         },
    //     ],
    //     myLostItems: [
    //         {
    //             id: 1,
    //             name: "에어팟",
    //             createdAt: "2022-10-02",
    //             status: false,
    //             reward: 20000,
    //         },
    //         {
    //             id: 2,
    //             name: "책",
    //             createdAt: "2023-02-02",
    //             status: true,
    //             reward: 30000,
    //         },
    //         {
    //             id: 3,
    //             name: "음식",
    //             createdAt: "2023-02-02",
    //             status: true,
    //             reward: 20000,
    //         },
    //     ],
    //     findLostItems: [
    //         {
    //             id: 1,
    //             name: "노트북",
    //             createdAt: "2021-10-02",
    //             reward: 10000,
    //         },
    //         {
    //             id: 2,
    //             name: "휴대폰",
    //             createdAt: "2022-02-02",
    //             reward: 10000,
    //         },
    //     ],
    // },
    user: null,
    userInfoLoading: false, // 유저 정보 가져오기 시도중
    userInfoDone: false,
    userInfoError: null,

    ////
    followLoading: false, // 팔로우 시도중
    followDone: false,
    followError: null,
    unfollowLoading: false, // 언팔로우 시도중
    unfollowDone: false,
    unfollowError: null,
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,
    changeNicknameLoading: false, // 닉네임 변경 시도중
    changeNicknameDone: false,
    changeNicknameError: null,
    loadFollowingsLoading: false,
    loadFollowingsDone: false,
    loadFollowingsError: null,
    loadFollowersLoading: false,
    loadFollowersDone: false,
    loadFollowersError: null,
    removeFollowerLoading: false,
    removeFollowerDone: false,
    removeFollowerError: null,

    signUpData: {},
    loginData: {},
};

/////////
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const USER_INFO_REQUEST = "USER_INFO_REQUEST";
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS";
export const USER_INFO_FAILURE = "USER_INFO_FAILURE";

export const USER_IMAGE_REMOVE_REQUEST = "USER_IMAGE_REMOVE_REQUEST";

export const USER_ITEM_EDIT_SUCCESS = "USER_ITEM_EDIT_SUCCESS";

/////////

export const USER_EDIT_REQUEST = "USER_EDIT_REQUEST";
export const USER_EDIT_SUCCESS = "USER_EDIT_SUCCESS";
export const USER_EDIT_FAIL = "USER_EDIT_FAIL";

export const ITEM_DELETE_REQUEST = "ITEM_DELETE_REQUEST";
export const ITEM_DELETE_SUCCESS = "ITEM_DELETE_SUCCESS";
export const ITEM_DELETE_FAIL = "ITEM_DELETE_FAIL";

////////

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST";
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS";
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE";

export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST";
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS";
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE";

export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

export const loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST,
    data,
});

export const logoutRequestAction = () => ({
    type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case USER_ITEM_EDIT_SUCCESS:
                const userIndexNumber = draft.user.writePosts.findIndex(
                    (v) => v.id === action.data.data.id
                );
                draft.user.writePosts[userIndexNumber] = action.data.data;
                break;

            case USER_IMAGE_REMOVE_REQUEST:
                const indexNumber = draft.user.writePosts.findIndex(
                    (v) => v.id === action.data.itemId
                );
                console.log("aqqqqqqqqq", action.data.itemId);
                console.log("asdasdasd", indexNumber);
                draft.user.writePosts[indexNumber].images =
                    draft.user.writePosts[indexNumber].images.filter(
                        (v) => v.fileName !== action.data.filename
                    );
                break;
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInError = null;
                draft.logInDone = false;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.user = action.data.data;
                draft.logInDone = true;
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;

            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutError = null;
                draft.logOutDone = false;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.user = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;

            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpError = null;
                draft.signUpDone = false;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpDone = true;
                break;
            case SIGN_UP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpError = action.error;
                break;

            case USER_INFO_REQUEST:
                draft.userInfoLoading = true;
                draft.userInfoDone = false;
                draft.userInfoError = null;
                break;
            case USER_INFO_SUCCESS:
                draft.userInfoLoading = false;
                draft.userInfoDone = true;
                draft.user = action.data.data;
                break;
            case USER_INFO_FAILURE:
                draft.userInfoLoading = false;
                draft.userInfoError = action.data;
                break;

            /////////////
            case ITEM_DELETE_REQUEST:
                draft.user.myLostItems = draft.user.myLostItems.filter(
                    (v) => v.id !== action.data.id
                );
                break;
            case ITEM_DELETE_SUCCESS:
                break;
            case ITEM_DELETE_FAIL:
                break;

            case USER_EDIT_REQUEST:
                draft.user.email = action.data.email;
                draft.user.nickname = action.data.nickname;
                break;
            case USER_EDIT_SUCCESS:
                break;
            case USER_EDIT_FAIL:
                break;

            case REMOVE_FOLLOWER_REQUEST:
                draft.removeFollowerLoading = true;
                draft.removeFollowerError = null;
                draft.removeFollowerDone = false;
                break;
            case REMOVE_FOLLOWER_SUCCESS:
                draft.removeFollowerLoading = false;
                draft.me.Followers = draft.me.Followers.filter(
                    (v) => v.id !== action.data.UserId
                );
                draft.removeFollowerDone = true;
                break;
            case REMOVE_FOLLOWER_FAILURE:
                draft.removeFollowerLoading = false;
                draft.removeFollowerError = action.error;
                break;
            case LOAD_FOLLOWINGS_REQUEST:
                draft.loadFollowingsLoading = true;
                draft.loadFollowingsError = null;
                draft.loadFollowingsDone = false;
                break;
            case LOAD_FOLLOWINGS_SUCCESS:
                draft.loadFollowingsLoading = false;
                draft.me.Followings = action.data;
                draft.loadFollowingsDone = true;
                break;
            case LOAD_FOLLOWINGS_FAILURE:
                draft.loadFollowingsLoading = false;
                draft.loadFollowingsError = action.error;
                break;
            case LOAD_FOLLOWERS_REQUEST:
                draft.loadFollowersLoading = true;
                draft.loadFollowersError = null;
                draft.loadFollowersDone = false;
                break;
            case LOAD_FOLLOWERS_SUCCESS:
                draft.loadFollowersLoading = false;
                draft.me.Followers = action.data;
                draft.loadFollowersDone = true;
                break;
            case LOAD_FOLLOWERS_FAILURE:
                draft.loadFollowersLoading = false;
                draft.loadFollowersError = action.error;
                break;
            case LOAD_MY_INFO_REQUEST:
                draft.loadMyInfoLoading = true;
                draft.loadMyInfoError = null;
                draft.loadMyInfoDone = false;
                break;
            case LOAD_MY_INFO_SUCCESS:
                draft.loadMyInfoLoading = false;
                draft.me = action.data;
                draft.loadMyInfoDone = true;
                break;
            case LOAD_MY_INFO_FAILURE:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoError = action.error;
                break;
            case FOLLOW_REQUEST:
                draft.followLoading = true;
                draft.followError = null;
                draft.followDone = false;
                break;
            case FOLLOW_SUCCESS:
                draft.followLoading = false;
                draft.me.Followings.push({ id: action.data.UserId });
                draft.followDone = true;
                break;
            case FOLLOW_FAILURE:
                draft.followLoading = false;
                draft.followError = action.error;
                break;
            case UNFOLLOW_REQUEST:
                draft.unfollowLoading = true;
                draft.unfollowError = null;
                draft.unfollowDone = false;
                break;
            case UNFOLLOW_SUCCESS:
                draft.unfollowLoading = false;
                draft.me.Followings = draft.me.Followings.filter(
                    (v) => v.id !== action.data.UserId
                );
                draft.unfollowDone = true;
                break;
            case UNFOLLOW_FAILURE:
                draft.unfollowLoading = false;
                draft.unfollowError = action.error;
                break;

            // case SIGN_UP_TWOSUCCESS:
            //     draft.signUpDone = false;
            case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameLoading = true;
                draft.changeNicknameError = null;
                draft.changeNicknameDone = false;
                break;
            case CHANGE_NICKNAME_SUCCESS:
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = true;
                draft.me.nickname = action.data.nickname;
                break;
            case CHANGE_NICKNAME_FAILURE:
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;
            case ADD_POST_TO_ME:
                draft.me.Posts.unshift({ id: action.data });
                break;
            // return {
            //   ...state,
            //   me: {
            //     ...state.me,
            //     Posts: [{ id: action.data }, ...state.me.Posts],
            //   },
            // };
            case REMOVE_POST_OF_ME:
                draft.me.Posts = draft.me.Posts.filter(
                    (v) => v.id !== action.data
                );
                break;
            // return {
            //   ...state,
            //   me: {
            //     ...state.me,
            //     Posts: state.me.Posts.filter((v) => v.id !== action.data),
            //   },
            // };
            default:
                break;
        }
    });

export default reducer;
