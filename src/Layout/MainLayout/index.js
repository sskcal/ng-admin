import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import {UserOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router-dom'
import './index.less'
const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

class MainLayout extends Component {
    state = {
        collapsed: false
    }
    onCollapse = collapsed => {
        console.log(collapsed)
        this.setState({ collapsed })
    }
    handelOnSelect = ({key})=>{
        this.props.history.push(key);
    }
   
    render() {
        
         const {path} = this.props.match
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu 
                    theme="dark" 
                    mode="inline"
                    defaultOpenKeys={['/users']}
                    defaultSelectedKeys={[path]}
                    onSelect={this.handelOnSelect}
                    >
                        <SubMenu key="/users" icon={<UserOutlined />} title="用户模块">
                            <Menu.Item key="/users/list">用户管理</Menu.Item>
                            <Menu.Item key="/users/roles">角色管理</Menu.Item>
                        </SubMenu>


                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>南歌票务系统 ©2020 Created by sskcal</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(MainLayout)