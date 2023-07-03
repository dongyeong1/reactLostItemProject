import { Row, Card, Col, Avatar, List, Button, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import TopLayout from "../components/TopLayout";
import { useDispatch, useSelector } from "react-redux";
import UserEditModal from "../components/UserEditModal";
import LostItemEditModal from "../components/LostItemEditModal";
import { ITEM_DELETE_REQUEST, ITEM_DELETE_SUCCESS } from "../reducers/user";

const MyPage = () => {
    const { confirm } = Modal;
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    const [showUserModal, setShowUserModal] = useState(false);
    const [showItemEditModal, setShowItemEditModal] = useState(false);
    const [showItemDeleteModal, setShowItemDeleteModal] = useState(false);

    const [itemId, setItemId] = useState();

    const userEditModalHandle = useCallback(() => {
        setShowUserModal(true);
    }, [showUserModal]);

    const ItemEditModalHandle = useCallback(
        (id) => {
            setShowItemEditModal(true);
            setItemId(id);
        },
        [showItemEditModal]
    );

    const ItemDeleteModalShow = useCallback(() => {
        setShowItemDeleteModal(true);
    }, [showItemDeleteModal]);

    const deleteItem = useCallback(
        (data) => [
            dispatch({
                type: ITEM_DELETE_REQUEST,
                data,
            }),
        ],
        []
    );

    const showConfirm = useCallback((data) => {
        console.log(data);
        confirm({
            title: "삭제하시겠습니까?",
            icon: <ExclamationCircleOutlined />,

            onOk() {
                console.log(data);
                dispatch({
                    type: ITEM_DELETE_REQUEST,
                    data: {
                        id: data,
                    },
                });
                //   deleteItem(data)
                //   setEditModal(false)
            },
            onCancel() {},
        });
    }, []);

    // useEffect(()=>{
    //     setItemId(itemId)
    // },[itemId])
    return (
        <div>
            <Row>
                <Col xs={24} md={8}>
                    <Card
                        style={{
                            marginTop: 50,
                            marginRight: 50,
                            marginBottom: 50,
                            marginLeft: 100,
                            height: 610,
                            borderRadius: 20,
                        }}
                    >
                        <Avatar
                            style={{ marginLeft: 40, marginTop: 50 }}
                            size={200}
                            icon={<UserOutlined />}
                        />
                        <div style={{ marginLeft: 10, marginTop: 50 }}>
                            <h1>이메일</h1>
                            <p>{user.email}</p>
                            <h1>닉네임</h1>
                            <p>{user.nickname}</p>
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            onClick={userEditModalHandle}
                            style={{
                                marginTop: 30,
                                marginLeft: 100,
                                borderRadius: 10,
                            }}
                        >
                            수정하기
                        </Button>
                        <UserEditModal
                            showUserModal={showUserModal}
                            setShowUserModal={setShowUserModal}
                        ></UserEditModal>
                    </Card>
                </Col>
                <Col xs={24} md={16}>
                    <Card
                        style={{
                            marginTop: 50,
                            marginRight: 100,
                            marginBottom: 50,
                            marginLeft: 50,
                            height: 280,
                            borderRadius: 20,
                        }}
                    >
                        <div>
                            <h2>등록한 분실물</h2>{" "}
                        </div>
                        <div>
                            <List
                                dataSource={user.myLostItems}
                                renderItem={(item, index) => (
                                    <>
                                        <List.Item
                                            actions={[
                                                <a
                                                    onClick={() =>
                                                        ItemEditModalHandle(
                                                            item.id
                                                        )
                                                    }
                                                    key="list-loadmore-edit"
                                                >
                                                    수정
                                                </a>,
                                                <a
                                                    onClick={() =>
                                                        showConfirm(item.id)
                                                    }
                                                    key="list-loadmore-more"
                                                >
                                                    삭제
                                                </a>,
                                            ]}
                                        >
                                            <div style={{ display: "flex" }}>
                                                <div>{index + 1}.</div>
                                                <div
                                                    style={{
                                                        width: 100,
                                                        marginLeft: 100,
                                                    }}
                                                >
                                                    {item.name}
                                                </div>
                                                <div
                                                    style={{
                                                        width: 100,
                                                        marginLeft: 20,
                                                    }}
                                                >
                                                    {item.reward} 원
                                                </div>
                                                <div style={{ marginLeft: 50 }}>
                                                    {item.createdAt}
                                                </div>
                                                <div
                                                    style={{ marginLeft: 100 }}
                                                >
                                                    {item.status
                                                        ? "찾는중"
                                                        : "찾음"}
                                                </div>
                                                {/* <Button  onClick={ItemEditModalHandle(item.id)}>asdas</Button> */}
                                            </div>
                                        </List.Item>
                                    </>
                                )}
                            ></List>
                        </div>
                    </Card>
                    <LostItemEditModal
                        itemId={itemId}
                        showItemEditModal={showItemEditModal}
                        setShowItemEditModal={setShowItemEditModal}
                    ></LostItemEditModal>
                    <Card
                        style={{
                            marginTop: 50,
                            marginRight: 100,
                            marginBottom: 50,
                            marginLeft: 50,
                            height: 280,
                            borderRadius: 20,
                        }}
                    >
                        <div>
                            <h2>찾아준 분실물</h2>{" "}
                        </div>
                        <div>
                            <List
                                dataSource={user.findLostItems}
                                renderItem={(item, index) => (
                                    <List.Item>
                                        <div style={{ display: "flex" }}>
                                            <div>{index + 1}.</div>
                                            <div
                                                style={{
                                                    width: 200,
                                                    marginLeft: 150,
                                                }}
                                            >
                                                {item.name}
                                            </div>
                                            <div style={{ width: 150 }}>
                                                {item.reward} 원
                                            </div>
                                            <div style={{}}>
                                                {item.createdAt}
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                            ></List>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default MyPage;
