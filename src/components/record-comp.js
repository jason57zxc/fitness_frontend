import React, { useState } from 'react'
import { FloatButton, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Calendar from './calendar-comp'
import List from './list-comp'
import RecordForm from './record-form-comp'
import TrainingService from '../services/training-services'
import Message from './message-comp'



const RecordComp = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const year = date.getFullYear()
    const month = date.getMonth()
    const monthStr = (month + 1).toString().padStart(2, '0')

    const showModal = () => {
        setIsModalOpen(true);
    };

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const openMessage = (type, content, duration) => {
        messageApi.open({
            type: type || 'success',
            content: content || '',
            duration: duration || 2,
        });
    };

    const getMonthData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        TrainingService.getTraining(year, monthStr)
            .then((res) => res.json())
            .then((resObj) => {
                if (resObj.result) {
                    setData([...resObj.data])
                } else {
                    openMessage('error', resObj?.message)
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }


    return (
        <div className='max-h-screen'>
            {contextHolder}
            <Calendar className='h-2/5'
                date={date} setDate={setDate}
                data={data}
                getMonthData={getMonthData} />

            <List className='h-auto'
                date={date} setDate={setDate}
                data={data} setData={setData} getMonthData={getMonthData}
                loading={loading} setLoading={setLoading} />

            <FloatButton
                onClick={showModal}
                style={{
                    bottom: '1.5rem',
                }}
                type="primary"
                icon={<PlusOutlined />} />

            <Modal title="Record"
                open={isModalOpen}
                // onOk={handleOk} 
                onCancel={handleCancel}
                footer={[
                ]}
            >
                <RecordForm modalClose={handleCancel}
                    date={date} setDate={setDate}
                    getMonthData={getMonthData} />
            </Modal>
        </div>
    )
}

export default RecordComp