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
    IMAGE_PATHS_NULL_REQUEST,
    IMAGE_UPLOAD_FAIL,
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOAD_SUCCESS,
    ITEM_ADD_FAIL,
    ITEM_ADD_REQUEST,
    ITEM_ADD_SUCCESS,
    ITEM_EDIT_FAIL,
    ITEM_EDIT_REQUEST,
    ITEM_EDIT_SUCCESS,
    LOAD_ITEM_FAIL,
    LOAD_ITEM_REQUEST,
    LOAD_ITEM_SUCCESS,
} from "../reducers/map";
import { USER_ITEM_EDIT_SUCCESS } from "../reducers/user";

//분실물등록
function additemAPI(data) {
    return axios.post("/api/posts", data);
}

function* additem(action) {
    try {
        const result = yield call(additemAPI, action.data); //call은동기니깐 put할때까지 기다려준다
        yield put({
            type: ITEM_ADD_SUCCESS,
            data: {
                content: action.data,
                data: result.data,
            },
        });
    } catch (err) {
        yield put({
            type: ITEM_ADD_FAIL,
            data: err.response.data,
        });
    }
}

//이미지업로드
function imageUploadAPI(data) {
    return axios.post("/api/posts/images", data);
}

function* imageUpload(action) {
    try {
        const result = yield call(imageUploadAPI, action.data); //call은동기니깐 put할때까지 기다려준다
        yield put({
            type: IMAGE_UPLOAD_SUCCESS,
            data: {
                content: action.data,
                data: result.data,
            },
        });
    } catch (err) {
        yield put({
            type: IMAGE_UPLOAD_FAIL,
            data: err.response.data,
        });
    }
}

//아이템수정
function editItemAPI(data) {
    return axios.put(`/api/posts/${data.id}`, {
        itemName: data.itemName,
        content: data.content,
        reward: data.reward,
        tradeType: data.tradeType,
        address: data.address,
        images: data.images,
    });
}

function* editItem(action) {
    try {
        const result = yield call(editItemAPI, action.data); //call은동기니깐 put할때까지 기다려준다
        yield put({
            type: ITEM_EDIT_SUCCESS,
            data: {
                content: action.data,
                data: result.data,
            },
        });

        yield put({
            type: USER_ITEM_EDIT_SUCCESS,
            data: {
                content: action.data,
                data: result.data,
            },
        });
        yield put({
            type: IMAGE_PATHS_NULL_REQUEST,
        });
    } catch (err) {
        yield put({
            type: ITEM_EDIT_FAIL,
            data: err.response.data,
        });
    }
}

//아이템로드
function loadItemAPI(data) {
    return axios.get(
        `/api/posts?southwestLatitude=${data.southlat}&southwestLongitude=${data.southlng}&northeastLatitude=${data.northlat}&northeastLongitude=${data.northlng}`
    );
}

function* loadItem(action) {
    try {
        const result = yield call(loadItemAPI, action.data); //call은동기니깐 put할때까지 기다려준다
        yield put({
            type: LOAD_ITEM_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOAD_ITEM_FAIL,
            data: err.response.data,
        });
    }
}

function* watchaddItem() {
    yield takeLatest(ITEM_ADD_REQUEST, additem);
}

function* watchimageUpload() {
    yield takeLatest(IMAGE_UPLOAD_REQUEST, imageUpload);
}

function* watchEditItem() {
    yield takeLatest(ITEM_EDIT_REQUEST, editItem);
}

function* watchLoadItem() {
    yield takeLatest(LOAD_ITEM_REQUEST, loadItem);
}
export default function* mapSaga() {
    yield all([
        fork(watchaddItem),
        fork(watchimageUpload),
        fork(watchEditItem),
        fork(watchLoadItem),
    ]);
}
