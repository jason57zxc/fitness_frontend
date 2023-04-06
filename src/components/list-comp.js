import React, { useEffect, useState } from 'react'
import { Avatar, Divider, List, Skeleton, Space, Table, Tag, Spin, Button } from 'antd';
const { Column, ColumnGroup } = Table;
import {
    DeleteOutlined
} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
// import AuthService from '../services/auth-services'
import TrainingService from '../services/training-services'
import Common from '../common.js'


const ListComp = (props) => {

    const { date, setDate, data, setData, getMonthData, loading, setLoading } = props

    const [listHeight, setListHeight] = useState(0);
    const [tid, setTid] = useState('')
    const [training, setTraining] = useState([]);

    useEffect(() => {
        getMonthData()
    }, []);

    useEffect(() => {
        let _training = data.filter(i => {
            return i.date == Common.getDateFormat(date)
        })
        if (_training?.length === 1) {
            setTid(_training[0]._id)
            //let _trainingData = _training[0].trainings.filter(i => i.records.length > 0)
            setTraining(_training[0].trainings)
        } else {
            setTid('')
            setTraining([])
        }
    }, [data, date])

    useEffect(() => {
        setListHeight(window.innerHeight - document.getElementById('scrollableDiv').offsetTop)
    });

    const onHandleDelete = async (e) => {
        //let tid = e.currentTarget.getAttribute('data-training')
        let setId = e.currentTarget.getAttribute('id')

        try {
            TrainingService.delete({ tid, setId })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not OK');
                    }
                    res.json().then(json => {
                        console.log(json);
                        if (json.result) {
                            alert(json.message)
                            getMonthData()
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

    return (
        <div
            id="scrollableDiv"
            className='overflow-auto'
            style={{
                height: `${listHeight}px`,
            }}
        >
            <InfiniteScroll
                dataLength={training.length}
                // next={loadMoreData}
                // hasMore={data.length < 50}
                loader={
                    <Skeleton
                        avatar
                        paragraph={{
                            rows: 1,
                        }}
                        active
                    />
                }
                // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={training}
                    renderItem={(item) => {
                        return item.records.length > 0 &&
                            <List.Item className='flex flex-col !items-start space-y-2'>
                                <label className=''>{item.moveName}</label>
                                <Table
                                    className='w-full'
                                    rowKey='_id'
                                    loading={loading}
                                    dataSource={item.records}
                                    size='middle'
                                    // showHeader={false}
                                    pagination={false}>
                                    <Column
                                        title="Set" dataIndex="set" key="set"
                                        align='center'
                                        render={(tag, arr, index) => (
                                            <>
                                                {tag &&
                                                    <Tag color="blue" key={tag}>
                                                        {tag}
                                                    </Tag>
                                                }
                                                {!tag &&
                                                    <Tag color="blue" key={index}>
                                                        {index + 1}
                                                    </Tag>
                                                }
                                            </>
                                        )}
                                    />

                                    <Column title="Weight" dataIndex="weight" key="weight"
                                        width="25%" align='center'
                                        render={(weight, arr) => (
                                            <>
                                                {
                                                    <div>{weight}{arr.unit}</div>
                                                }
                                            </>
                                        )} />
                                    <Column title="Reps" dataIndex="reps" key="reps" width="20%" align='center' />
                                    <Column title="RIR" dataIndex="rir" key="rir" width="20%"
                                        align='center'
                                        render={(rir = 0) => (
                                            <>
                                                <div>{rir}</div>
                                            </>
                                        )} />
                                    <Column
                                        title="Action" key="action" width="20%" align='center'
                                        render={(_, record) => (
                                            <Button danger onClick={onHandleDelete}
                                                id={record._id}>
                                                <DeleteOutlined />
                                            </Button>
                                        )}
                                    />
                                </Table>
                                {/* <List.Item.Meta
                                // avatar={<Avatar src={item.picture.large} />}
                                // title={item.moveName}
                                // description={item.records.map(record => {
                                //     return <div key={record._id}>
                                //         {`${record.weight}${record.unit}*${record.reps}`}
                                //     </div>
                                // })}
                            /> */}

                                {/* <div>{item.moveId}</div> */}
                            </List.Item>
                    }
                    }
                />
                {/* 
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender,
                        defaultExpandedRowKeys: ['0'],
                    }}
                    dataSource={data}
                    size="middle"
                /> */}
            </InfiniteScroll>
        </div>
    )

}

export default ListComp
