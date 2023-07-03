import { Button, Input, Form, DatePicker, Select, Radio } from "antd";
import { useRef, useCallback, useState, useEffect } from "react";
import TopLayout from "../components/TopLayout";
import styled from "styled-components";
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

import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { ITEM_ADD_REQUEST } from "../reducers/map";
import AddressInput from "../components/AddressInput";
const InputWrapper = styled.div`
    width: 500px;

    margin: 50px auto 0 auto;
    .ant-input {
        width: 500px;
        border-radius: 50px;
    }
`;

const ItemPost = () => {
    const [markerPosition, setMarkerPosition] = useState({
        lat: "",
        lng: "",
    });

    const containerStyle = {
        marginTop: 10,
        width: 500,
        height: 300, // zIndex:-1,
    };

    const [center, setCenter] = useState({
        lat: 37.5657037,
        lng: 126.9768616,
    });

    const mapClickHandle = useCallback(
        (e) => {
            setMarkerPosition({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            });
        },
        [markerPosition]
    );

    const options = [
        { value: "신발" },
        { value: "전자기기" },
        { value: "음식" },
    ];

    const dispatch = useDispatch();

    const [itemName, setItemName] = useState(""); //분실물이름
    //이미지
    const [content, setContent] = useState(""); //분실물내용
    const [reward, setReward] = useState(0); //사례금
    const [date, setDate] = useState(); //날짜
    const [address, setAddress] = useState(""); //분실주소
    const [directValue, setDirectValue] = useState(true);
    const [deliveryValue, setDeliveryValue] = useState(true);

    const imageInput = useRef();

    const [showModal, setShowModal] = useState(false);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onChangeImages = useCallback((e) => {
        console.log("images", e.target.files);
        // const imageFormData=new FormData();
        // [].forEach.call(e.target.files,(f)=>{
        //   imageFormData.append('image',f)
        // })
        // dispatch({
        //   type:UPLOAD_IMAGES_REQUEST,
        //   data:imageFormData
        // })
    }, []);

    const onChangeItemName = useCallback(
        (e) => {
            setItemName(e.target.value);
        },
        [itemName]
    );

    const onChangeContent = useCallback(
        (e) => {
            setContent(e.target.value);
        },
        [content]
    );

    const addComma = (price) => {
        let returnString = price
            ?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    };

    const onChangeReward = useCallback(
        (e) => {
            // console.log(e.target.value.type);
            var a = e.target.value;
            var str = a.replaceAll(",", "");
            setReward(str);
        },
        [reward]
    );

    const onChangeDate = useCallback(
        (date, dateString) => {
            console.log(date);
            console.log(dateString);

            setDate(dateString);
        },
        [date]
    );

    // useEffect(() => {
    //     console.log(typeof reward);
    //     Number(reward);
    //     // console.log(Number(reward));
    //     console.log(typeof reward);

    //     // setReward(parseInt(reward, 10).toLocaleString());
    // }, [reward]);

    // const onChangeAddress=useCallback((e)=>{
    //     console.log(e.target.value)
    //     },[address])

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

    const onComplete = useCallback(
        (data) => {
            console.log(data);
            setAddress(data.address);
            setShowModal(false);
        },
        [address]
    );

    const showModalHandle = useCallback(() => {
        setShowModal(true);
    }, [showModal]);

    const closeModal = useCallback(() => {
        setShowModal(false);
    }, [showModal]);

    const onSubmit = useCallback(() => {
        console.log(
            "asdasd",
            itemName,
            content,
            date,
            address,
            directValue,
            deliveryValue
        );
        dispatch({
            type: ITEM_ADD_REQUEST,
            data: {
                id: Math.floor(Math.random() * 101),
                name: itemName,
                content,
                image: [
                    {
                        id: Math.floor(Math.random() * 101),
                        url: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA0MjZfMTY1%2FMDAxNjgyNTIxMTI1NzEz.4aBRLNug9Kzv0BYB7uPLkykxW1pDfVSfJbvGFcizdgAg.CdgvAL-PpYhz6WimFoEj4QW8QUtkfMb1aXopy-iHFvcg.PNG.leehs0560%2Fimage.png&type=a340",
                    },
                ],
                reward,
                createdAt: date,
                tradeType: {
                    direct: directValue,
                    delivery: deliveryValue,
                },
                address: {
                    lat: markerPosition.lat,
                    lng: markerPosition.lng,
                },
            },
        });
    }, [
        itemName,
        content,
        date,
        address,
        directValue,
        deliveryValue,
        markerPosition,
    ]);

    const asd = () => {
        setReward(reward + "원");
    };

    // const [itemName,setItemName]=useState('')//분실물이름
    // //이미지
    // const [content,setContent]=useState('')//분실물내용
    // const [reward,setReward]=useState(0)//사례금
    // const [date,setDate]=useState('')//날짜
    // const [address,setAddress]=useState('')//분실주소
    // const [category,setCategory]=useState('')
    // const [directValue,setDirectValue]=useState('')
    // const [deliveryValue,setDeliveryValue]=useState('')
    return (
        <div>
            <InputWrapper>
                <Form onFinish={onSubmit} layout="vertical">
                    <Form.Item label="이미지" required>
                        {/* 1.onchange 함수가발동될때마다 이미지를 서버에 저장시키고 경로를 받아와서 리듀서에 저장후 화면에뿌린다
                    2.폼 등록 버튼을 누를때 그 이미지경로를 가져와서 디비에 저장시킨다
                */}
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
                    <Form.Item label="분실물 이름">
                        <Input
                            size="large"
                            value={itemName}
                            onChange={onChangeItemName}
                            required
                            placeholder="분실물 이름"
                        ></Input>
                    </Form.Item>

                    <Form.Item
                        required
                        label="추정분실지역을 검색해서 오른쪽마우스로 지도에 찍어주세요"
                    >
                        {/* <Input
                 addonBefore={<span style={{cursor:'pointer',width:300}} onClick={showModalHandle}> 주소검색</span>}
                  value={address} 
                  
                ></Input> */}

                        <Modal isOpen={showModal} onRequestClose={closeModal}>
                            <DaumPostcode
                                onComplete={onComplete}
                            ></DaumPostcode>
                        </Modal>
                        <AddressInput setCenter={setCenter}></AddressInput>

                        <LoadScript
                            googleMapsApiKey={process.env.REACT_APP_MAP_API}
                        >
                            <GoogleMap
                                onRightClick={mapClickHandle}
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={12}
                            >
                                <MarkerF position={markerPosition}></MarkerF>
                            </GoogleMap>
                        </LoadScript>
                    </Form.Item>

                    <Form.Item required label="상세주소">
                        <Input placeholder="상세주소를 입력해주세요"></Input>
                    </Form.Item>

                    <Form.Item required label="배송">
                        <Radio.Group
                            onChange={deliveryOnChange}
                            value={deliveryValue}
                        >
                            <Radio value={true}>가능</Radio>
                            <Radio value={false}>불가능</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item required label="직거래">
                        <Radio.Group
                            onChange={directOnChange}
                            value={directValue}
                        >
                            <Radio value={true}>가능</Radio>
                            <Radio value={false}>불가능</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <div style={{ display: "flex" }}>
                        <Form.Item required label="사례금">
                            <div style={{ display: "flex" }}>
                                <Input
                                    // onBlur={asd}
                                    style={{ width: 120 }}
                                    value={addComma(reward) || ""}
                                    onChange={onChangeReward}
                                    required
                                    placeholder="사례금"
                                    type="text"
                                >
                                    {/* <p>원</p> */}
                                </Input>
                                <div style={{ fontSize: 20, marginLeft: 5 }}>
                                    원
                                </div>
                            </div>
                        </Form.Item>
                        <Form.Item
                            required
                            style={{ marginLeft: 80 }}
                            valuePropName={"date"}
                            label="분실날짜"
                        >
                            <DatePicker onChange={onChangeDate}></DatePicker>
                        </Form.Item>
                    </div>

                    <Form.Item label="설명" required>
                        <Input.TextArea
                            size="large"
                            value={content}
                            onChange={onChangeContent}
                            required
                            placeholder="설명"
                        ></Input.TextArea>
                    </Form.Item>

                    <div style={{ width: 200, margin: "20px auto" }}>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            style={{ width: 200, borderRadius: 30 }}
                        >
                            분실물 등록하기
                        </Button>
                    </div>
                </Form>
            </InputWrapper>
        </div>
    );
};

export default ItemPost;
