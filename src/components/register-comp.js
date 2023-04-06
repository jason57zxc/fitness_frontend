import React, { useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/auth-services'

const RegisterComp = (props) => {
    const { setUser } = props
    const navigate = useNavigate();
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onUsernameChanged = (e) => {
        setUsername(e.target.value);
    }

    const onEmailChanged = (e) => {
        let val = e.target.value
        setEmail(val);
    }

    const onPasswordChanged = (e) => {
        setPassword(e.target.value);
    }

    const onLoginClickHandler = async (e) => {
        try {
            // eslint-disable-next-line
            const values = await form.validateFields();
            AuthService.register(username, email, password)
                .then(res => {
                    //debugger
                    if (!res.ok) {
                        throw new Error('Network response was not OK');
                    }
                    res.json().then(json => {
                        if (json.result) {
                            localStorage.setItem('user', JSON.stringify(json.user))
                            setUser(AuthService.getCurrentUser())
                            alert(json.message)
                            navigate('/profile')
                        } else {
                            alert(json.message)
                        }
                    });
                }).catch(err => {
                    alert(err)
                })
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', e => {
            if (e.key === 'Enter') onLoginClickHandler()
        })
        // eslint-disable-next-line
    }, [])

    return (
        <div className="flex justify-center h-full items-center">
            <Form
                form={form}
                name="register"
                layout="horizontal"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={onUsernameChanged} />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please input your email!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" onChange={onEmailChanged} />
                </Form.Item>

                <Form.Item
                    // label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        allowClear
                        onChange={onPasswordChanged}
                    />
                </Form.Item>

                <Form.Item>
                    <Button className="btn btn-primary w-full" onClick={onLoginClickHandler}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterComp
