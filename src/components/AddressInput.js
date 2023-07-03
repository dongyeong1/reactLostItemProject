import GeoCode from "./GeoCode";
import React, { useEffect, useState } from "react";
import { Input, Button, Modal } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

const SearchWrapper = styled(Input)`
    border-radius: 200px;
    height: 50px;
    width: 500px;
    font-size: 25px;
`;

function AddressInput({
    setCenter,
    // searchsuccess,
    // setText,
    // text,
    // errorText,
    // setErrorText,
    // searcherror,
}) {
    const [text, setText] = useState("");
    const [errorText, setErrorText] = useState("");

    const searchsuccess = () => {
        Modal.success({
            content: text,
        });
    };
    const searcherror = () => {
        Modal.error({
            content: errorText,
        });
    };
    useEffect(() => {
        setText("검색성공");
    }, [text]);

    useEffect(() => {
        setErrorText("없는 지역입니다");
    }, [errorText]);

    const handleButton = async () => {
        const currentAddr = document.getElementById("address").value;
        if (currentAddr) {
            console.log(currentAddr);
            //   return await console.log(GeoCode(currentAddr))
            const location = await GeoCode(currentAddr);
            console.log("asd", location);
            if (location.msg) {
                setErrorText("다른지역으로 검색해주세요");

                searcherror();
            } else {
                setCenter({
                    lat: location.lat,
                    lng: location.lng,
                });
                setText("검색성공");
                console.log(text);
                searchsuccess();
            }

            // console.log("ddd", lat, lng);
        }
    };
    return (
        <div>
            <SearchWrapper
                prefix={<SearchOutlined style={{ fontSize: 30 }} />}
                enterButton="검색"
                onPressEnter={handleButton}
                placeholder="지역을 검색해보세요"
                id="address"
            />
            {/* <Button type="primary" onClick={handleButton}>클릭</Button> */}
        </div>
    );
}

export default AddressInput;
