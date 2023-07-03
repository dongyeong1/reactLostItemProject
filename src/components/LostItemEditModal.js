import React, { useCallback, useState } from "react";
import { Button, Input, Form, DatePicker, Select, Radio, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { USER_EDIT_REQUEST } from "../reducers/user";
import { ITEM_EDIT_REQUEST } from "../reducers/map";

const LostItemEditModal = ({
    itemId,
    showItemEditModal,
    setShowItemEditModal,
}) => {
    const options = [
        { value: "신발" },
        { value: "전자기기" },
        { value: "음식" },
    ];

    const dispatch = useDispatch();

    const { items } = useSelector((state) => state.map);

    const item = items.find((v) => v.id === itemId);

    const [name, setName] = useState();
    const [content, setContent] = useState();
    const [reward, setReward] = useState();
    const [category, setCategory] = useState("");
    const [directValue, setDirectValue] = useState("");
    const [deliveryValue, setDeliveryValue] = useState("");

    //     const [email,setEmail]=useState('')
    //     const [nickname,setNickname]=useState('')

    //     const onChangeEmail=useCallback((e)=>{
    //         setEmail(e.target.value)
    //     },[email])

    //     const onChangeNickname=useCallback((e)=>{
    //         setNickname(e.target.value)
    //     },[nickname])

    //     const onSubmit=useCallback(()=>{
    //         dispatch({
    //             type:USER_EDIT_REQUEST,
    //             data:{
    //                 email,nickname
    //             }
    //         })
    //     },[ email,nickname])

    const onChangeName = useCallback(
        (e) => {
            setName(e.target.value);
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
            setReward(e.target.value);
        },
        [reward]
    );

    const onChangeCategory = useCallback(
        (e) => {
            console.log(e);
            setCategory(e);
        },
        [category]
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

    const handleCancel = useCallback(() => {
        setShowItemEditModal(false);
    }, []);

    const onSubmit = useCallback(() => {
        dispatch({
            type: ITEM_EDIT_REQUEST,
            data: {
                id: itemId,
                name,
                content,
                reward,
                category,
                directValue,
                deliveryValue,
            },
        });
    }, [itemId, name, content, reward, category, directValue, deliveryValue]);

    return (
        <div>
            {item ? (
                <Modal
                    title="수정하기"
                    open={showItemEditModal}
                    onCancel={handleCancel}
                >
                    <Form layout="vertical" onFinish={onSubmit}>
                        <div>{itemId}</div>
                        <Form.Item label="이름">
                            <Input
                                size="large"
                                style={{ borderRadius: 100, width: 400 }}
                                placeholder={item.name}
                                value={name}
                                onChange={onChangeName}
                            ></Input>
                        </Form.Item>
                        <Form.Item label="내용">
                            <Input
                                size="large"
                                style={{ borderRadius: 100, width: 400 }}
                                placeholder={item.content}
                                value={content}
                                onChange={onChangeContent}
                            ></Input>
                        </Form.Item>
                        <Form.Item label="카테고리">
                            <Select
                                mode="multiple"
                                size="large"
                                placeholder="Please select"
                                defaultValue={item.category}
                                onChange={onChangeCategory}
                                style={{ width: 500 }}
                                options={options}
                            />
                        </Form.Item>
                        <Form.Item label="사례금">
                            <Input
                                size="large"
                                style={{ borderRadius: 100, width: 400 }}
                                placeholder={item.reward}
                                value={reward}
                                onChange={onChangeReward}
                            ></Input>
                        </Form.Item>
                        <Form.Item label="배송여부">
                            <Radio.Group
                                onChange={deliveryOnChange}
                                defaultValue={item.tradeType.delivery}
                                value={deliveryValue}
                            >
                                <Radio value={true}>가능</Radio>
                                <Radio value={false}>불가능</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="직거래여부">
                            <Radio.Group
                                onChange={directOnChange}
                                defaultValue={item.tradeType.direct}
                                value={directValue}
                            >
                                <Radio value={true}>가능</Radio>
                                <Radio value={false}>불가능</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={handleCancel}
                        >
                            수정하기
                        </Button>
                    </Form>
                </Modal>
            ) : null}
        </div>
    );
};

export default LostItemEditModal;
