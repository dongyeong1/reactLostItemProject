import { Card, List, Avatar, Col, Row, Input } from "antd";
import React from "react";
import TopLayout from "../components/TopLayout";

const Chat = () => {
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
                            style={{
                                height: 100,
                                borderRadius: 30,
                                margin: "20px 30px",
                                width: 740,
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Chat;
