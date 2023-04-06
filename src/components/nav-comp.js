import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {
    HomeOutlined,
    IdcardOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
    CalendarOutlined,
    ReconciliationOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd'
import AuthService from '../services/auth-services'

const NavComp = (props) => {

    let { user, setUser } = props
    //let [selectedItem, setSelectedItem] = useState('home')
    let [menuItems, setMenuItems] = useState([])
    const navigate = useNavigate()

    const onLogoutHandler = (e) => {
        e.preventDefault()
        AuthService.logout()
        setUser(AuthService.getCurrentUser())
        alert('Logout successful')
        navigate('', { replace: true })
    }

    const items = [{
        key: 'home',
        icon: <HomeOutlined />,
        label: <Link to="/">
            Home
        </Link>,
        type: null,

    },
    {
        key: 'login',
        icon: <LoginOutlined />,
        label: <Link to="/login">
            Login
        </Link>,
    },
    {
        key: 'register',
        icon: <UserAddOutlined />,
        label: <Link to="/register">
            Register
        </Link>,
    },
    {
        key: 'profile',
        icon: <IdcardOutlined />,
        label: <Link to="/profile">
            Profile
        </Link>,
    },
    {
        key: 'record',
        icon: <CalendarOutlined />,
        label: <Link to="/record">
            Record
        </Link>,
    },
    {
        key: 'move',
        icon: <ReconciliationOutlined />,
        label: <Link to="/move">
            Move
        </Link>,
    },
    {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: <Link onClick={onLogoutHandler} >
            Logout
        </Link>,
    }];

    const unloginNavs = ['home', 'login', 'register']
    const loginNav = ['home', 'profile', 'record', 'logout', 'move']

    useEffect(() => {
        setMenuItems(items.filter(item => {
            if (user) {
                return loginNav.includes(item.key)
            } else {
                return unloginNavs.includes(item.key)
            }
        }))
        // eslint-disable-next-line
    }, [user])

    return (
        <div>
            <Menu
                //defaultSelectedKeys={[selectedKey]}
                selectedKeys={[]}
                mode="inline"
                theme="dark"
                items={menuItems}
                className="pt-4 px-2"
            />
        </div>
    )
}

export default NavComp