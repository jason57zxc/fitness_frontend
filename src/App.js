import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Nav from './components/nav-comp'
import Home from './components/home-comp'
import Login from './components/login-comp'
import Profile from './components/profile-comp'
import Register from './components/register-comp'
import Record from './components/record-comp'
import Move from './components/move-form-comp'
import AuthService from "./services/auth-services"


import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import { Layout } from 'antd';
const { Sider, Content, Header } = Layout;

function App() {

    let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    let [collapsed, setCollapsed] = useState(true);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }

    return (
        <div>
            <Layout className="min-h-screen">

                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <Nav user={currentUser} setUser={setCurrentUser} />
                </Sider>

                <Layout className="min-h-screen">
                    <Header className="px-2" style={{ backgroundColor: 'white', paddingLeft: 15 }}>
                        {
                            collapsed && (
                                <MenuUnfoldOutlined onClick={toggleCollapsed} />
                            )
                        }
                        {
                            !collapsed
                            && (
                                <MenuFoldOutlined onClick={toggleCollapsed} />
                            )
                        }
                    </Header>
                    <Content className="h-full">
                        <Routes>
                            <Route path="/" element={<Home user={currentUser} />} />
                            <Route path="/login" element={<Login user={currentUser} setUser={setCurrentUser} />} />
                            <Route path="/profile" element={<Profile user={currentUser} setUser={setCurrentUser} />} />
                            <Route path="/register" element={<Register user={currentUser} setUser={setCurrentUser} />} />
                            <Route path="/record" element={<Record user={currentUser} />} />
                            <Route path="/move" element={<Move user={currentUser} />} />
                        </Routes>
                    </Content>
                </Layout>


            </Layout>
        </div>
    );
}

export default App;
