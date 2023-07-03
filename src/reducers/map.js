import { BranchesOutlined } from "@ant-design/icons";
import produce from "immer";

export const initialState = {
    searchLocation: null,
    items: [
        {
            id: 1,
            name: "에어팟",
            content: "에어팟입니다",
            image: [
                {
                    id: 1,
                    url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA0MjZfMTY1%2FMDAxNjgyNTIxMTI1NzEz.4aBRLNug9Kzv0BYB7uPLkykxW1pDfVSfJbvGFcizdgAg.CdgvAL-PpYhz6WimFoEj4QW8QUtkfMb1aXopy-iHFvcg.PNG.leehs0560%2Fimage.png&type=a340",
                },
            ],
            reward: 20000,
            createdAt: "2020-02-23",
            category: "전자기기",
            tradeType: {
                direct: false,
                delivery: true,
            },
            // status: false,
            address: {
                lat: 35.2285453,
                lng: 128.889352,
            },
            opacity: 0.1,
        },
        {
            id: 2,
            name: "책",
            content: "책입니다",
            image: [
                {
                    id: 1,
                    url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA0MjZfMTY1%2FMDAxNjgyNTIxMTI1NzEz.4aBRLNug9Kzv0BYB7uPLkykxW1pDfVSfJbvGFcizdgAg.CdgvAL-PpYhz6WimFoEj4QW8QUtkfMb1aXopy-iHFvcg.PNG.leehs0560%2Fimage.png&type=a340",
                },
            ],
            reward: 20000,
            createdAt: "2020-03-21",
            category: "전자기기",
            tradeType: {
                direct: false,
                delivery: true,
            },
            // status: false,
            address: {
                lat: 35.2258188,
                lng: 128.8835435,
            },
            opacity: 0.1,
        },
        {
            id: 3,
            name: "음식",
            content: "음식입니다",
            image: [
                {
                    id: 1,
                    url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA0MjZfMTY1%2FMDAxNjgyNTIxMTI1NzEz.4aBRLNug9Kzv0BYB7uPLkykxW1pDfVSfJbvGFcizdgAg.CdgvAL-PpYhz6WimFoEj4QW8QUtkfMb1aXopy-iHFvcg.PNG.leehs0560%2Fimage.png&type=a340",
                },
            ],
            reward: 20000,
            createdAt: "2020-01-22",
            category: "전자기기",
            tradeType: {
                direct: false,
                delivery: true,
            },
            // status: false,
            address: {
                lat: 35.226712,
                lng: 128.8791308,
            },
            opacity: 0.1,
        },
    ],
};

export const ITEM_EDIT_REQUEST = "ITEM_EDIT_REQUEST";
export const ITEM_EDIT_SUCCESS = "ITEM_EDIT_SUCCESS";
export const ITEM_EDIT_FAIL = "ITEM_EDIT_FAIL";

export const ITEM_ADD_REQUEST = "ITEM_ADD_REQUEST";
export const ITEM_ADD_SUCCESS = "ITEM_ADD_SUCCESS";
export const ITEM_ADD_FAIL = "ITEM_ADD_FAIL";

export const MARKER_MOUSE_OVER_REQUEST = "MARKER_MOUSE_OVER_REQUEST";
export const MARKER_MOUSE_OVER_SUCCESS = "MARKER_MOUSE_OVER_SUCCESS";
export const MARKER_MOUSE_OVER_FAIL = "MARKER_MOUSE_OVER_FAIL";

export const MARKER_MOUSE_OUT_REQUEST = "MARKER_MOUSE_OUT_REQUEST";
export const MARKER_MOUSE_OUT_SUCCESS = "MARKER_MOUSE_OUT_SUCCESS";
export const MARKER_MOUSE_OUT_FAIL = "MARKER_MOUSE_OUT_FAIL";

export const SEARCH_LOCATION_REQUEST = "SEARCH_LOCATION_REQUEST";

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case ITEM_EDIT_REQUEST:
                const findIndexss = draft.items.findIndex(
                    (v) => v.id === action.data.id
                );
                console.log("asdasdasas", findIndexss);
                draft.items[findIndexss] = {
                    id: draft.items[findIndexss].id,
                    name: action.data.name,
                    content: action.data.content,
                    image: [
                        {
                            id: 1,
                            url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA0MjZfMTY1%2FMDAxNjgyNTIxMTI1NzEz.4aBRLNug9Kzv0BYB7uPLkykxW1pDfVSfJbvGFcizdgAg.CdgvAL-PpYhz6WimFoEj4QW8QUtkfMb1aXopy-iHFvcg.PNG.leehs0560%2Fimage.png&type=a340",
                        },
                    ],
                    reward: action.data.reward,
                    createdAt: "2020-01-22",
                    category: action.data.category[0],
                    tradeType: {
                        direct: action.data.directValue,
                        delivery: action.data.deliveryValue,
                    },
                    // status: false,
                    address: {
                        lat: draft.items[findIndexss].address.lat,
                        lng: draft.items[findIndexss].address.lng,
                    },
                };
                break;
            case ITEM_EDIT_SUCCESS:
                break;
            case ITEM_EDIT_FAIL:
                break;

            case ITEM_ADD_REQUEST:
                draft.items.unshift(action.data);
                break;

            case SEARCH_LOCATION_REQUEST:
                draft.searchLocation = action.data;
                break;

            case MARKER_MOUSE_OVER_REQUEST:
                const findIndex = draft.items.findIndex(
                    (v) => v.address.lat === action.data
                );
                draft.items[findIndex].opacity = 0.9;

                break;
            case MARKER_MOUSE_OVER_SUCCESS:
                break;
            case MARKER_MOUSE_OVER_FAIL:
                break;
            case MARKER_MOUSE_OUT_REQUEST:
                const findIndexs = draft.items.findIndex(
                    (v) => v.address.lat === action.data
                );
                draft.items[findIndexs].opacity = 0.1;
                break;
            case MARKER_MOUSE_OUT_SUCCESS:
                break;
            case MARKER_MOUSE_OUT_FAIL:
                break;
            default:
                break;
        }
    });

export default reducer;
