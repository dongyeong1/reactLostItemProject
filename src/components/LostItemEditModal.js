import React, { useCallback, useEffect, useState, useRef } from "react";
import { Button, Input, Form, DatePicker, Select, Radio, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    USER_EDIT_REQUEST,
    USER_IMAGE_REMOVE_REQUEST,
    USER_INFO_REQUEST,
} from "../reducers/user";
import {
    GoogleMap,
    OverlayView,
    LoadScript,
    MarkerClusterer,
    InfoWindow,
    MarkerClustererF,
    MarkerF,
    InfoBox,
    Marker,
    InfoBoxF,
} from "@react-google-maps/api";
import {
    IMAGE_PATHS_NULL_REQUEST,
    IMAGE_REMOVE_REQUEST,
    IMAGE_UPLOAD_REQUEST,
    ITEM_EDIT_REQUEST,
} from "../reducers/map";

const LostItemEditModal = ({
    itemContent,
    showItemEditModal,
    setShowItemEditModal,
}) => {
    const imageInput = useRef();

    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch({
    //         type: USER_INFO_REQUEST,
    //     });
    // }, []);

    useEffect(() => {
        console.log("aaaaaaaaa", itemContent);
    }, []);

    const { user } = useSelector((state) => state.user);

    // const item = user && user.writePosts.find((v) => v.id === itemId);
    const { imagePaths } = useSelector((state) => state.map);

    const [name, setName] = useState(itemContent && itemContent.itemName);
    // const [name, setName] = useState("");
    const [userImageRemove, setUserImageRemove] = useState(false);

    const [content, setContent] = useState(itemContent && itemContent.content);
    const [reward, setReward] = useState(itemContent && itemContent.reward);
    const [directValue, setDirectValue] = useState(
        itemContent && itemContent.tradeType.direct
    );
    const [deliveryValue, setDeliveryValue] = useState(
        itemContent && itemContent.tradeType.delivery
    );

    const [markerPosition, setMarkerPosition] = useState({
        lat: itemContent && itemContent.address.latitude,
        lng: itemContent && itemContent.address.longitude,
    });

    const onChangeName = useCallback(
        (e) => {
            setName(e.target.value);
            console.log(e.target.value);
        },
        [name]
    );

    const onChangeContent = useCallback(
        (e) => {
            setContent(e.target.value);
        },
        [content]
    );

    const onChangeReward = useCallback(
        (e) => {
            var a = e.target.value;
            var str = a.replaceAll(",", "");
            setReward(str);
        },
        [reward]
    );

    const directOnChange = useCallback(
        (e) => {
            setDirectValue(e.target.value);
        },
        [directValue]
    );

    const deliveryOnChange = useCallback(
        (e) => {
            setDeliveryValue(e.target.value);
        },
        [deliveryValue]
    );

    const mapClickHandle = useCallback(
        (e) => {
            setMarkerPosition({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            });
            console.log(e.latLng.lat());
        },
        [markerPosition]
    );

    const [street, setStreet] = useState(
        itemContent && itemContent.address.street
    );

    const onChangeStreet = useCallback(
        (e) => {
            setStreet(e.target.value);
        },
        [street]
    );

    const [center, setCenter] = useState({
        lat: itemContent && itemContent.address.latitude,
        lng: itemContent && itemContent.address.longitude,
    });
    const containerStyle = {
        marginTop: 10,
        width: 450,
        height: 300, // zIndex:-1,
    };
    const onSubmit = useCallback(() => {
        console.log("asdasdsad");
        dispatch({
            type: ITEM_EDIT_REQUEST,
            data: {
                id: itemContent.id,
                itemName: name,
                content,
                reward,
                tradeType: {
                    direct: directValue,
                    delivery: deliveryValue,
                },
                address: {
                    street,
                    latitude: markerPosition.lat,
                    longitude: markerPosition.lng,
                },
                images: imagePaths,
            },
        });
        setShowItemEditModal(false);
    }, [
        showItemEditModal,
        itemContent,
        imagePaths,
        name,
        content,
        reward,
        directValue,
        deliveryValue,
        markerPosition,
        street,
    ]);

    const handleCancel = useCallback(() => {
        dispatch({
            type: IMAGE_PATHS_NULL_REQUEST,
        });
        setShowItemEditModal(false);
        console.log("name", name);
    }, [showItemEditModal]);

    const editOnRemoveImage = useCallback(
        (filename) => {
            dispatch({
                type: USER_IMAGE_REMOVE_REQUEST,
                data: {
                    filename,
                    itemId: itemContent.id,
                },
            });
            setUserImageRemove(true);
        },
        [itemContent]
    );

    const onChangeImages = useCallback((e) => {
        console.log("images", e.target.files);

        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append("image", f);
        });
        dispatch({
            type: IMAGE_UPLOAD_REQUEST,
            data: imageFormData,
        });
    }, []);
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onRemoveImage = useCallback((data) => {
        dispatch({
            type: IMAGE_REMOVE_REQUEST,
            data,
        });
    });

    const addComma = (price) => {
        let returnString = price
            ?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    };

    return (
        <div>
            {
                <Modal
                    title="수정하기"
                    open={showItemEditModal}
                    onCancel={handleCancel}
                >
                    <Form layout="vertical">
                        <Form.Item label="이미지" required>
                            {/* 1.onchange 함수가발동될때마다 이미지를 서버에 저장시키고 경로를 받아와서 리듀서에 저장후 화면에뿌린다
                    2.폼 등록 버튼을 누를때 그 이미지경로를 가져와서 디비에 저장시킨다
                */}

                            {imagePaths.map((v, i) => (
                                <div
                                    key={v}
                                    style={{ display: "inline-block" }}
                                >
                                    <img
                                        src={`http://localhost:8080/uploads/images/${v.fileName}`}
                                        style={{ width: "200px" }}
                                        alt={v}
                                    />
                                    <div>
                                        <Button
                                            onClick={() =>
                                                onRemoveImage(v.fileName)
                                            }
                                        >
                                            제거
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <input
                                type="file"
                                multiple
                                hidden
                                ref={imageInput}
                                onChange={onChangeImages}
                            ></input>
                            <Button onClick={onClickImageUpload}>
                                이미지 업로드
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <LoadScript
                                googleMapsApiKey={process.env.REACT_APP_MAP_API}
                            >
                                <GoogleMap
                                    onRightClick={mapClickHandle}
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={12}
                                >
                                    <MarkerF
                                        position={markerPosition}
                                    ></MarkerF>
                                </GoogleMap>
                            </LoadScript>
                        </Form.Item>

                        <Form.Item required label="상세주소">
                            <Input
                                size="large"
                                style={{ borderRadius: 100, width: 400 }}
                                placeholder="상세주소를 입력해주세요"
                                value={street}
                                onChange={onChangeStreet}
                            ></Input>
                        </Form.Item>

                        <Form.Item label="이름">
                            <Input
                                size="large"
                                style={{ borderRadius: 100, width: 400 }}
                                value={name}
                                onChange={onChangeName}
                            ></Input>
                        </Form.Item>
                        <Form.Item label="내용">
                            <Input
                                size="large"
                                style={{ borderRadius: 100, width: 400 }}
                                value={content}
                                onChange={onChangeContent}
                            ></Input>
                        </Form.Item>

                        <Form.Item label="사례금">
                            <div style={{ display: "flex" }}>
                                <Input
                                    size="large"
                                    style={{ borderRadius: 100, width: 120 }}
                                    value={addComma(reward) || ""}
                                    onChange={onChangeReward}
                                    type="text"
                                ></Input>
                                <div style={{ fontSize: 25, marginLeft: 5 }}>
                                    원
                                </div>
                            </div>
                        </Form.Item>
                        <Form.Item label="배송여부">
                            <Radio.Group
                                onChange={deliveryOnChange}
                                // defaultValue={item.tradeType.delivery}
                                value={deliveryValue}
                            >
                                <Radio value={true}>가능</Radio>
                                <Radio value={false}>불가능</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="직거래여부">
                            <Radio.Group
                                onChange={directOnChange}
                                // defaultValue={item.tradeType.direct}
                                value={directValue}
                            >
                                <Radio value={true}>가능</Radio>
                                <Radio value={false}>불가능</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                    <Button
                        // type="primary"
                        // htmlType="submit"
                        // htmlType="submit"
                        onClick={onSubmit}
                    >
                        수정하기
                    </Button>
                </Modal>
            }
        </div>
    );
};

export default LostItemEditModal;
