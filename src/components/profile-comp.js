import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Descriptions } from 'antd'
import AuthService from '../services/auth-services'

const ProfileComp = (props) => {

    let { user, setUser } = props

    const navigate = useNavigate()

    useEffect(() => {
        if (!AuthService.getCurrentUser()) {
            navigate('/')
        }
    }, [user])

    return (
        <div className="flex justify-center h-full items-center">
            {
                user && (
                    <Descriptions title="User Info" className="w-3/4 h-1/2" bordered column='3'>
                        <Descriptions.Item label="User" span='3'>{user.username}</Descriptions.Item>
                        <Descriptions.Item label="Email" span='3'>{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Role" span='3'>{user.role}</Descriptions.Item>
                    </Descriptions>
                )
            }

        </div >
    )

}

export default ProfileComp
