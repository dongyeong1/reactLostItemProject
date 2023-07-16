import { Card, List, Avatar, Col, Row, Input, Button } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
// import { useCallback } from "react/cjs/react.development";
import TopLayout from "../components/TopLayout";
import { USER_INFO_REQUEST } from "../reducers/user";
// import SockJS from "sockjs-client";
// import { Stomp } from "@stomp/stompjs";

const Chat = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    useEffect(() => {
        dispatch({
            type: USER_INFO_REQUEST,
        });
    }, []);

    const onChangeMessage = useCallback(
        (e) => {
            setMessage(e.target.value);
        },
        [message]
    );

    useEffect(() => {
        // const socket = new SockJS("http://localhost:8080/ws-connection");
        // const stompClient = Stomp.over(socket);
        // stompClient.connect({}, function (frame) {
        //     console.log("Connected: " + frame);
        //     stompClient.subscribe("/subscribe/rooms/1", function (message) {
        //         console.log(message.body);
        //         console.log(typeof message.body);
        //         console.log(JSON.parse(message.body));
        //     });
        // });
    }, []);

    const sendMessage = () => {
        // stompClient.send(
        //     "/publish/messages/1",
        //     {},
        //     JSON.stringify({
        //         message,
        //         senderId: 1,
        //         receiverId: 2,
        //         roomId: 1,
        //     })
        // );
        setMessage("");
    };

    const data = [
        {
            title: "Ant Design Title 1",
        },
        {
            title: "Ant Design Title 2",
        },
        {
            title: "Ant Design Title 3",
        },
        {
            title: "Ant Design Title 4",
        },
        {
            title: "Ant Design Title 5",
        },
    ];

    return (
        <div
            style={{
                backgroundColor: "lightGray",
                position: "relative",
                margin: "20px auto",
                width: 1200,
                height: 700,
                borderRadius: 30,
            }}
        >
            <Row>
                <Col xs={8}>
                    <Card style={{ height: 700, borderRadius: 30 }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                                            />
                                        }
                                        title={
                                            <a href="https://ant.design">
                                                {item.title}
                                            </a>
                                        }
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        ></List>
                    </Card>
                </Col>
                <Col xs={16}>
                    <div>sad</div>
                    <div style={{ width: 800, marginTop: 540 }}>
                        <Input.TextArea
                            value={message}
                            onChange={onChangeMessage}
                            style={{
                                height: 100,
                                borderRadius: 30,
                                margin: "20px 30px",
                                width: 740,
                            }}
                        />
                        <Button onClick={sendMessage}>전송</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Chat;
