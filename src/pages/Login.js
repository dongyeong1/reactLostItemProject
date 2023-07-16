import { Button, Input } from "antd";
import styled from "styled-components";
import TopLayout from "../components/TopLayout";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOG_IN_REQUEST, USER_INFO_REQUEST } from "../reducers/user";

const ErrorWrapper = styled.div`
    color: red;
    margin-top: 10px;
`;
const InputWrapper = styled.div`
margin:auto;
width:340px;
margin-top:180px;
  .ant-input{
      margin-top:40px;
    display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center ;
  border-radius:100px;
  width:340px;
    


 
`;

const Buttons = styled(Button)`
    width: 100px;
    height: 40px;
    border-radius: 100px;
    margin-top: 50px;
    margin-left: 120px;
`;

const Login = () => {
    const inputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = useCallback(
        (e) => {
            setEmail(e.target.value);
            setEmailError(false);
        },
        [email]
    );

    const onChangePassword = useCallback(
        (e) => {
            setPassword(e.target.value);
            setPasswordError(false);
        },
        [password]
    );

    useEffect(() => {
        dispatch({
            type: USER_INFO_REQUEST,
        });
    }, []);

    useEffect(() => {
        console.log(inputRef);
        inputRef.current.focus();
    }, []);
    const onSubmit = useCallback(() => {
        console.log("asdsa");
        if (email && password) {
            dispatch({
                type: LOG_IN_REQUEST,
                data: {
                    email,
                    password,
                },
            });
        } else {
            if (!email) {
                setEmailError(true);
            }
            if (!password) {
                setPasswordError(true);
            }
        }
    }, [email, password, emailError, passwordError]);

    return (
        <div>
            <InputWrapper>
                <Input
                    ref={inputRef}
                    type="email"
                    name="user-email"
                    value={email}
                    onChange={onChangeEmail}
                    size="large"
                    placeholder="이메일을 입력해주세요"
                />
                {emailError ? (
                    <ErrorWrapper>이메일을 입력해주세요!</ErrorWrapper>
                ) : null}
                <Input
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    size="large"
                    placeholder="비밀번호를 입력해주세요"
                />
                {passwordError ? (
                    <ErrorWrapper>비밀번호를 입력해주세요!</ErrorWrapper>
                ) : null}
                <Buttons type="primary" className="btn" onClick={onSubmit}>
                    로그인
                </Buttons>
            </InputWrapper>
            <div style={{ width: 180, margin: "auto", marginTop: 30 }}>
                아직 회원이 아니라면?
                <Link to="/signup">
                    <span>회원가입</span>
                </Link>
            </div>
        </div>
    );
};

export default Login;
