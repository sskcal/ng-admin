import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { leftMenu } from '../../config/router'
import './index.less'
const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
let showBread = {}
class MainLayout extends Component {
    state = {
        collapsed: false,
        bread:{}
    }
    onCollapse = collapsed => {
        this.setState({ collapsed })
    }
    handelOnSelect = ({ key }) => {
        this.props.history.push(key);
    }
    componentDidMount() {
        this.setState({ 
            bread:showBread
        });
    }
    getMenu = (item) => {
        return item.map(x => {
            const { path, title, children, icon,hide,bread } = x
            if(bread){
                showBread[path] = bread
            }
            
            if(hide) return
            if (children) {
                return <SubMenu key={path} icon={icon} title={title}>{this.getMenu(children)}</SubMenu>
            } else {
                return <Menu.Item key={path}>{title}</Menu.Item>
            }
        })
    }
    render() {
        
        
        const { path } = this.props.match
        
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
                        
                        {
                            this.getMenu(leftMenu)
                        }

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        {
                            
                                showBread[path].map(x => {
                                    return <Breadcrumb.Item key={path}>{x}</Breadcrumb.Item>
                                })
                       }
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