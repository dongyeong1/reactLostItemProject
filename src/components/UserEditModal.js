import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { USER_EDIT_REQUEST, USER_INFO_REQUEST } from "../reducers/user";

const UserEditModal = ({ showUserModal, setShowUserModal }) => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch({
    //         type: USER_INFO_REQUEST,
    //     });
    // }, []);
    const { user } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");

    const onChangeEmail = useCallback(
        (e) => {
            setEmail(e.target.value);
        },
        [email]
    );

    const onChangeNickname = useCallback(
        (e) => {
            setNickname(e.target.value);
        },
        [nickname]
    );

    const onSubmit = useCallback(() => {
        dispatch({
            type: USER_EDIT_REQUEST,
            data: {
                email,
                nickname,
            },
        });
    }, [email, nickname]);

    const handleCancel = useCallback(() => {
        setShowUserModal(false);
    }, []);

    return (
        <Modal title="수정하기" open={showUserModal} onCancel={handleCancel}>
            <Form layout="vertical" onFinish={onSubmit}>
                <Form.Item label="이메일">
                    <Input
                        size="large"
                        style={{ borderRadius: 100, width: 400 }}
                        placeholder={user && user.email}
                        value={email}
                        onChange={onChangeEmail}
                    ></Input>
                </Form.Item>
                <Form.Item label="닉네임">
                    <Input
                        size="large"
                        style={{ borderRadius: 100, width: 400 }}
                        placeholder={user && user.nickname}
                        value={nickname}
                        onChange={onChangeNickname}
                    ></Input>
                </Form.Item>

                <Button type="primary" htmlType="submit" onClick={handleCancel}>
                    수정하기
                </Button>
            </Form>
        </Modal>
    );
};

export default UserEditModal;
