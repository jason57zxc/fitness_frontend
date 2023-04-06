import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select, InputNumber, message } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import AuthService from '../services/auth-services'
import MoveService from '../services/move-services'
import TrainingService from '../services/training-services'
import Common from '../common.js'

const RecordFormComp = (props) => {

    const { modalClose, date, setDate, getMonthData } = props

    let [apiData, setApiData] = useState([])
    // let [groupData, setGroupData] = useState([])
    // let [moveData, setMoveData] = useState([])
    // let [groupSelectedData, setGroupSelectedData] = useState([])
    let [moveOpts, setMoveOpts] = useState([])
    let [processing, setProcessing] = useState(false)

    //let [group, setGroup] = useState('')
    // let [move, setMove] = useState('')
    // let [weight, setWeight] = useState('')
    // let [reps, setReps] = useState('')
    // let [rir, setRIR] = useState('')
    // let [unit, setUnit] = useState('')


    const [messageApi, contextHolder] = message.useMessage();

    //form hooks
    const [form] = Form.useForm()
    const move = Form.useWatch('action', form);
    const weight = Form.useWatch('weight', form);
    const reps = Form.useWatch('reps', form);
    const rir = Form.useWatch('rir', form);
    const unit = Form.useWatch('unit', form);

    // const onGroupChange = (value) => {
    //     setGroup(value)
    //     setGroupSelectedData(moveData[value])
    //     setMove(moveData[value][0]);
    // };
    // const onMoveChange = (value) => {
    //     setMove(value);
    // };
    // const onWeightChange = (value) => {
    //     setWeight(value);
    // };
    // const onRepChange = (value) => {
    //     setReps(value);
    // };
    // const onRIRChange = (value) => {
    //     setRIR(value);
    // };
    // const onUnitChange = (value) => {
    //     setUnit(value);
    // };

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const success = (content, duration = 1.5) => {
        messageApi.open({
            type: 'success',
            content,
            duration,
        });
    };

    const onAddClickHandler = async (e) => {
        setProcessing(true)
        let _uid = AuthService.getCurrentUserID();
        if (!_uid) {
            console.log('UID is empty')
            setProcessing(false)
            return
        }
        let _body = {
            userId: _uid,
            date: Common.getDateFormat(date),
            trainings: [
                {
                    moveId: move,
                    records: [
                        {
                            reps,
                            weight,
                            unit,
                            rir,
                        }
                    ]
                }
            ]
        }
        try {
            // eslint-disable-next-line
            const values = await form.validateFields();

            TrainingService.addTraining(_body)
                .then(res => {
                    //debugger
                    if (!res.ok) {
                        throw new Error('Network response was not OK');
                    }
                    res.json().then(json => {
                        setProcessing(false)
                        success(json.message)
                        if (json.result) {
                            getMonthData()
                            modalClose()
                            form.resetFields()
                        }
                    });
                }).catch(err => {
                    setProcessing(false)
                    alert(err)
                })
        } catch (errorInfo) {
            setProcessing(false)
            console.log('Failed:', errorInfo);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', e => {
            if (e.key === 'Enter') onAddClickHandler()
        })

        try {
            MoveService.getMoves()
                .then(res => {
                    res.json().then(async json => {
                        console.log(json)
                        if (json.result) {
                            setApiData(json.data)
                        } else {
                            console.error(json.message)
                        }
                    })
                })
        } catch (error) {
            console.log(error)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (apiData?.length == 0) return
        // group data
        let _groups = apiData.map(i => {
            return { group: i.group, id: i._id }
        })
        //setGroupData(_groups)

        // move data
        // let _moves = _groups.reduce((accum, current, index) => {
        //     accum[current.group] = apiData[index].moves
        //     return accum
        // }, {})
        // setMoveData(_moves)

        let _movesOpts = _groups.reduce((accum, current, index) => {
            accum.push({
                label: current.group,
                options: apiData[index].moves.map(i => {
                    return { label: i.name, value: i._id }
                })
            })
            return accum
        }, [])
        setMoveOpts(_movesOpts)
    }, [apiData])

    const unitSuffixSelector = (
        <Form.Item name="unit" noStyle>
            <Select
                style={{ width: 80 }}
            // onChange={onUnitChange}
            >
                <Select.Option value="kg">kg</Select.Option>
                <Select.Option value="lb">lb</Select.Option>
            </Select>
        </Form.Item>
    );

    return (
        <div className="flex justify-center h-full items-center">
            {contextHolder}
            <Form
                form={form}
                name="training"
                layout="horizontal"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='w-full'
                scrollToFirstError
                initialValues={{
                    'unit': 'kg'
                }}
            >

                {/* <Form.Item
                    name="group"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a part.',
                        },
                    ]}

                <Select
                    className='w-full mb-4'
                    value={group}
                    placeholder="Select a part"
                    onChange={onGroupChange}
                    options={groupData.map(i => ({
                        label: i.group,
                        value: i.group,
                    }))}
                />
                {/* </Form.Item> */}
                {/* 
                <Form.Item
                    name="move"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a move.',
                        },
                    ]}
                <Select
                    className='w-full mb-4'
                    value={move}
                    onChange={onMoveChange}
                    options={groupSelectedData.map(i => ({
                        label: i.name,
                        value: i._id,
                    }))}
                />
                {/* </Form.Item> */}

                <Form.Item
                    name="action"
                    rules={[{ required: true, message: 'Please input action!' }]}
                >
                    <Select
                        className='w-full'
                        value={move}
                        // onChange={onMoveChange}
                        options={moveOpts}
                        placeholder='Action'
                    />
                </Form.Item>

                <Form.Item
                    name="weight"
                    rules={[{ required: true, message: 'Please input load weight!' }]}
                >
                    <InputNumber
                        min={0}
                        addonAfter={unitSuffixSelector}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        // onChange={onWeightChange}
                        placeholder='Weight'
                        className='w-full' />
                </Form.Item>

                <Form.Item
                    name="reps"
                    rules={[{ required: true, message: 'Please input Reps!' }]}
                >
                    <InputNumber
                        min={0}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        // onChange={onRepChange}
                        placeholder="Reps"
                        className='w-full' />
                </Form.Item>

                <Form.Item
                    name="rir"
                // rules={[{ required: true, message: 'Please input reps!' }]}
                >
                    <InputNumber
                        min={0}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        // onChange={onRIRChange}
                        placeholder="RIR"
                        className='w-full' />
                </Form.Item>

                <Form.Item className="flex justify-center w-full mb-0">
                    <Button
                        className="w-full"
                        onClick={onAddClickHandler}
                        loading={processing}
                        disabled={processing}>
                        Add Record
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default RecordFormComp
