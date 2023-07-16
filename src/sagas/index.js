import { all, fork, call, put, takeLatest } from "redux-saga/effects";

import axios from "axios";
import userSaga from "./user";
import mapSaga from "./map";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([fork(mapSaga), fork(userSaga)]);
}
