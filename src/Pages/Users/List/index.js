import React, { axios, useState, useEffect } from 'react'
import { useAntdTable } from 'ahooks'
import { Button, Card, Form, Input, message, Table, Select, Divider, Modal,Tag,Popconfirm } from 'antd'

const { Option } = Select
//获取用户列表数据的方法
const getTableData = async ({ current, pageSize }, formData) => {
    let postData = {
        ...formData,
        current,
        size: pageSize
    }
    let result = await axios.post('/users/list', postData)
    let { data } = result
    return {
        list: data[2].result || [],
        total: data[2].count || 0,
    }
}

//获取角色列表的方法
const getRoles = async () => {
    const result = await axios.post('/roles/list')
    const data = result.data[2]
    return data
}

const delUser = async (userid) =>{
    const result = await axios.post('/users/remove',{_id:userid})
    const [status,msg,data] = result.data
    return [status,msg,data]
}


//列表组件（含Form)
const AppList = (props) => {
    const { random } = props

    const [form] = Form.useForm()
    const [state, setState] = useState({ roles: [] })
    const { tableProps, search, run } = useAntdTable(getTableData, {
        defaultPageSize: 10,
        form,
    })


    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            title: '角色',
            dataIndex: 'roles',
            render:(record)=>{
            return record.map(x=><Tag key={x.val} color={x.val === 'root'?'magenta':'orange'}>{x.name}</Tag>)
            }
        },
        {
            title: '操作',
            render: (record) => {
                return <div>
                    <Popconfirm title="确认删除此信息？" okText="Yes" cancelText="No" onConfirm={async ()=>{
                        const [status] = await delUser(record._id)
                        if(status){
                            message.success('删除用户成功')
                            run({...tableProps.pagination})
                        }
                        }}>
                        <a>删除</a>
                    </Popconfirm>
                    
                    <Divider type="vertical" />
                    <a>查看用户</a>
                </div>
            }
        },
    ]



    useEffect(() => {
        getRoles().then(data => {
            setState({ ...state, roles: data })
        })
        return () => {
            form.setFieldsValue({
                rolesVal: ''
            })
        }
        // 
    }, [state.roles.map(x => x.val).join('|')])

    useEffect(() => {
        run({ ...tableProps.pagination, current: 1 })
    }, [random])

    const { type, changeType, submit, reset } = search
    const searchForm = (
        <div style={{ marginBottom: 16 }}>
            <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Form.Item name="rolesVal">
                    <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
                        <Option value="">所有角色</Option>
                        {
                            state.roles.map(x => {
                                return <Option key={x._id} value={x.val}>{x.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="username">
                    <Input.Search placeholder="请输入用户名" style={{ width: 240 }} onSearch={submit} />
                </Form.Item>
                <Button type="link" onClick={changeType}>
                    Advanced Search
            </Button>
            </Form>
        </div>
    )

    return (
        <div>
            {searchForm}
            <Table columns={columns} rowKey="_id" {...tableProps} />
        </div>
    )
}

//用户列表页组件
export default function Index() {
    const [form] = Form.useForm()
    const [state, setState] = useState({ modalVisble: false, modalTitle: "", random: '',roles:[] })
    const createUser = () => {
        //弹出modal对话框
        setState({ ...state, modalVisble: true, modalTitle: "创建用户" })
    }
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 10 }
    }
    const submit = async () => {

        form.validateFields().then(async values => {
            console.log(values)
            const result = await axios.post('/users/create', { ...values })
            const [status, msg, data] = result.data || [false, '', {}]
            if (!status) return message.error(msg)
            setState({ ...state, random: Math.random() })
            message.success(msg)
            setState({ ...state, modalVisble: false })
        }).catch(error => {
            console.log(error)
        })

    }

    useEffect(() => {
        getRoles().then(data => {
            setState({ ...state, roles: data })
        })
    }, [state.roles.map(x => x.val).join('|')])
    return (
        <Card title="用户管理" extra={<Button type="primary" onClick={() => { createUser() }}>新建用户</Button>}>
            <Modal onCancel={()=>{setState({...state,modalVisble:false})}} onOk={() => { submit() }} visible={state.modalVisble} title={state.modalTitle}>
                <Form form={form} {...layout}>
                    <Form.Item label="用户名" name="username" rules={[
                        {
                            required: true, message: '用户名不能为空'
                        },
                        {
                            min: 2, message: "用户名不能少于2个字符"
                        },
                        {
                            max: 15, message: "用户名不能大于15个字符"
                        }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="密码" name="password"
                        rules={[
                            {
                                min: 6, message: '密码长度不能少于6位'
                            },
                            {
                                required: true, message: '密码不能为空'
                            }
                        ]}
                    >
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item name="rolesVal" label="请选择" rules={[{required:true,message:'请选择角色'}]}>
                        <Select mode="multiple" placeholder="请选择角色" > 
                            {
                                state.roles.map(x => {
                                    return <Option key={x._id} value={x.val}>{x.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="手机号" name="phone"
                        rules={[
                            { required: true, message: ' ' },
                            () => ({
                                validator(rule, value) {
                                    if (/^1[3456789]\d{9}/.test(value)) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject('请输入正确的手机号')
                                }
                            })
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <AppList random={state.random}></AppList>
        </Card>
    )
}