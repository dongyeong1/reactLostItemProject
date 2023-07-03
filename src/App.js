import { BrowserRouter, Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";
import { Col, Row } from "antd";

import "./App.css";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import ItemPost from "./pages/ItemPost";
import ItemMap from "./pages/ItemMap";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignUp";
import TopLayout from "./components/TopLayout";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <TopLayout></TopLayout>
                <Row>
                    <Col xs={24} md={24}>
                        <Routes>
                            <Route
                                exact
                                path="/home"
                                element={<Home></Home>}
                            ></Route>
                            <Route
                                exact
                                path="/chat"
                                element={<Chat></Chat>}
                            ></Route>
                            <Route
                                exact
                                path="/itempost"
                                element={<ItemPost></ItemPost>}
                            ></Route>
                            <Route
                                exact
                                path="/itemmap"
                                element={<ItemMap></ItemMap>}
                            ></Route>
                            <Route
                                exact
                                path="/login"
                                element={<Login></Login>}
                            ></Route>
                            <Route
                                exact
                                path="/signup"
                                element={<SignUp></SignUp>}
                            ></Route>
                            <Route
                                exact
                                path="/mypage"
                                element={<MyPage></MyPage>}
                            ></Route>
                        </Routes>
                    </Col>
                </Row>
            </div>
        </BrowserRouter>
    );
}

export default App;
