import { Input, Button, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import TopLayout from "../components/TopLayout";
import styled from "styled-components";
import {
    UserOutlined,
    SearchOutlined,
    CaretRightOutlined,
    CaretLeftOutlined,
} from "@ant-design/icons";
import GeoCode from "../components/GeoCode";
import { useDispatch } from "react-redux";
import { SEARCH_LOCATION_REQUEST } from "../reducers/map";
import { useNavigate } from "react-router-dom";

const SearchWrapper = styled(Input)`
    // margin-left:710px;
    border-radius: 200px;
    height: 50px;
    width: 500px;
    font-size: 25px;
`;

const Home = () => {
    const navigate = useNavigate();
    const [errorText, setErrorText] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        setErrorText("없는 지역입니다");
    }, [errorText]);

    const error = () => {
        Modal.error({
            content: errorText,
        });
    };

    const handleButton = async () => {
        const currentAddr = document.getElementById("address").value;
        if (currentAddr) {
            console.log(currentAddr);
            //   return await console.log(GeoCode(currentAddr))
            const location = await GeoCode(currentAddr);

            if (location.msg) {
                setErrorText("다른지역으로 검색해주세요");

                return error();
            } else {
                dispatch({
                    type: SEARCH_LOCATION_REQUEST,
                    data: { lat: location.lat, lng: location.lng },
                });
                return navigate("/itemmap");
            }

            // console.log("ddd", lat, lng);
        }
    };

    // const areaSearch=useCallback(()=>{

    //     handleButton()

    //   },[])

    return (
        <div>
            <div
                style={{
                    textAlign: "center",
                    width: 500,
                    margin: "auto",
                    marginTop: 250,
                    marginBottom: 30,
                    fontSize: 25,
                }}
            >
                물건을 잃어버렸던 지역을 검색해보세요
            </div>

            <div style={{ width: 500, margin: "auto" }}>
                <SearchWrapper
                    prefix={<SearchOutlined style={{ fontSize: 30 }} />}
                    placeholder="지역을 검색해보세요"
                    size="large"
                    id="address"
                    onPressEnter={handleButton}
                ></SearchWrapper>
            </div>
        </div>
    );
};

export default Home;
