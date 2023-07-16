import {
    all,
    fork,
    call,
    take,
    put,
    takeEvery,
    takeLatest,
    delay,
} from "redux-saga/effects";

import axios from "axios";
import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    USER_INFO_FAILURE,
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
} from "../reducers/user";
import {
    ITEM_ADD_FAIL,
    ITEM_ADD_REQUEST,
    ITEM_ADD_SUCCESS,
} from "../reducers/map";

//회원가입
function signupAPI(data) {
    return axios.post("/api/auth/signup", {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
    });
}

function* signup(action) {
    try {
        const result = yield call(signupAPI, action.data); //call은동기니깐 put할때까지 기다려준다
        yield put({
            type: SIGN_UP_SUCCESS,
            data: {
                content: action.data,
                data: result.data,
            },
        });
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            data: err.response.data,
        });
    }
}

//로그인
function loginAPI(data) {
    return axios.post("/api/auth/login", {
        email: data.email,
        password: data.password,
    });
}

function* login(action) {
    try {
        const result = yield call(loginAPI, action.data); //call은동기니깐 put할때까지 기다려준다
        yield put({
            type: LOG_IN_SUCCESS,
            data: {
                content: action.data,
                data: result.data,
            },
        });
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            data: err.response.data,
        });
    }
}

//로그아웃
function logoutAPI(data) {
    return axios.post("/api/auth/logout");
}

function* logout(action) {
    try {
        const result = yield call(logoutAPI, action.data); //call은동기니깐 put할때까지 기다려준다
        yield put({
            type: LOG_OUT_SUCCESS,
            data: {
                content: action.data,
                data: result.data,
            },
        });
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            data: err.response.data,
        });
    }
}

//유저정보 불러오기
function userinfoAPI() {
    return axios.get("/api/users/my-info");
}

function* userinfo(action) {
    try {
        const result = yield call(userinfoAPI, action.data); //call은동기니깐 put할때까지 기다려준다
        yield put({
            type: USER_INFO_SUCCESS,
            data: {
                content: action.data,
                data: result.data,
            },
        });
    } catch (err) {
        yield put({
            type: USER_INFO_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signup);
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchUserInfo() {
    yield takeLatest(USER_INFO_REQUEST, userinfo);
}
export default function* userSaga() {
    yield all([
        fork(watchSignUp),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchUserInfo),
    ]);
}
