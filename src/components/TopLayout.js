import React, { useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Popover, Badge, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";

const Popovers = styled.div``;

const LayoutWrapper = styled.div`
    height: 100px;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;

    .login {
        border: 2px solid #1890ff;
        padding: 10px 30px;
        margin-right: 20px;
        font-size: 16px;
        color: #1890ff;
    }

    .home {
        width: 300px;
        font-size: 22px;
        margin-left: 20px;
    }

    .nav_content {
        .map {
            font-size: 22px;
            margin-left: 70px;
            color: black;
        }
        .post {
            font-size: 22px;
            margin-left: 30px;
            color: black;
        }
        .chat {
            font-size: 22px;
            margin-left: 70px;
            color: black;
        }
        margin-right: auto;
        margin-left: 300px;
    }
`;

const ContentWrapper = styled.div``;
const TopLayout = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const logout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, [user]);

    const content = (
        <div style={{ height: 60 }}>
            <div>
                <Link to="/mypage">
                    <span
                        style={{ fontSize: 16, color: "black" }}
                        className="mypage"
                    >
                        마이페이지
                    </span>
                </Link>{" "}
            </div>
            <div style={{ marginTop: 10 }}>
                <Link to="/home">
                    <p
                        style={{ fontSize: 16, color: "black" }}
                        onClick={logout}
                    >
                        로그아웃
                    </p>
                </Link>
            </div>
        </div>
    );
    // const notificationCount =
    //     user && user.data.notification.filter((v) => v.read !== true);
    return (
        <div>
            <LayoutWrapper>
                <Link to="/home">
                    <span className="home">홈</span>
                </Link>
                <div className="nav_content">
                    <Link to="/itempost">
                        {" "}
                        <span className="post">분실물 등록</span>
                    </Link>

                    <Link to="/itemmap">
                        {" "}
                        <span className="map">분실물 보기</span>
                    </Link>
                    <Link to="/chat">
                        {" "}
                        <span className="chat">채팅</span>
                    </Link>
                </div>
                {/* <Link to="/signup">
                    {" "}
                    <span className="map">회원가입</span>
                </Link> */}

                {/* <Badge count={notificationCount.length}>
                    <Popover
                        content={
                            <div>
                                {user.notification.map((v) => (
                                    <p>{v.message}</p>
                                ))}
                            </div>
                        }
                    >
                        <span className="noti">알림</span>
                    </Popover>
                </Badge> */}

                {user ? (
                    <Popover className="pop" content={content}>
                        <Link>
                            {" "}
                            <span className="login">{user.nickname}님</span>
                        </Link>
                    </Popover>
                ) : (
                    <Link to="/login">
                        {" "}
                        <span className="login">로그인/회원가입</span>
                    </Link>
                )}
            </LayoutWrapper>
            <ContentWrapper>{children}</ContentWrapper>
        </div>
    );
};

export default TopLayout;
