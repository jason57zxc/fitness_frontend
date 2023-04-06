import React, { useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/auth-services'

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.min.css";

const LoginComp = (props) => {
    const { setUser } = props
    const navigate = useNavigate();
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [processing, setProcessing] = useState(false)
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onEmailChanged = (e) => {
        let val = e.target.value
        setEmail(val);
    }

    const onPasswordChanged = (e) => {
        setPassword(e.target.value);
    }

    const onLoginClickHandler = async (e) => {
        setProcessing(true)
        try {
            // eslint-disable-next-line
            await form.validateFields().then(() => {
                AuthService.login(email, password)
                    .then(res => {
                        setProcessing(false)
                        if (!res.ok) {
                            throw new Error('Network response was not OK');
                        }
                        res.json().then(json => {
                            console.log(json)
                            if (json.result) {
                                localStorage.setItem('user', JSON.stringify(json.user))
                                localStorage.setItem('token', JSON.stringify(json.token))
                                setUser(AuthService.getCurrentUser())
                                alert(json.message)
                                navigate('/profile')
                            } else alert('Login Fail')
                        });
                    }).catch(err => {
                        alert(err)
                    })
            }).catch(err => {
                console.log(err)
            })

        } catch (errorInfo) {
            //console.log('Failed:', errorInfo);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', e => {
            if (e.key === 'Enter') onLoginClickHandler()
        })
        // eslint-disable-next-line
    })

    return (
        <div className="flex justify-center h-full items-center">
            <Form
                form={form}
                name="login"
                layout="horizontal"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='w-5/12'
            >
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
                    <Button className="btn btn-primary w-full"
                        loading={processing}
                        disabled={processing}
                        onClick={onLoginClickHandler}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginComp
