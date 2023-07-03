import { combineReducers } from "redux";

import user from "./user";
import map from "./map";

// import post from './post';

const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            default:
                return state;
        }
    },
    user,

    map,
});

export default rootReducer;
