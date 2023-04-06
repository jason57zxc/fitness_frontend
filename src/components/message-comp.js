import React, { useEffect } from 'react';
import { message } from 'antd';

const MessageComp = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { content, duration, type } = props
    const openMessage = () => {
        messageApi.open({
            type: type || 'success',
            content: content || '',
            duration: duration || 2,
        });
    };

    useEffect(() => {
        openMessage()
    })

    return (
        <>
            {contextHolder}
        </>
    );
};

export default MessageComp;