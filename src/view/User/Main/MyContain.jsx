import React, { Component } from 'react'
import { Layout, Space } from 'antd';
import style from './contain.module.scss'
import MyHeader from '../Other/MyHeader/MyHeader'
import Polit from '../Other/MyPolit/Polit'
import {Outlet} from 'react-router-dom'
import { subscribe } from 'pubsub-js';
import './contain.css'
const { Header,Sider, Content } = Layout;
export default class MyContain extends Component {
  componentDidMount(){
    subscribe('changetit',(_,data)=>{
      this.setState({tit:data.data})
    })
  }
  state={tit:'概括'}
  render() {
    return (
      <div> <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
      size={[0, 48]}
    >
        <Layout className={style.botall}>
        <Header className={style.headerStyle}>
          <MyHeader/>
        </Header>
        <Layout>
          <Sider className={style.siderStyle}>
            <Polit/>
          </Sider>
          <Content className={style.contentStyle}>
            <div className={style.total}>{this.state.tit}
         
            </div>
            <Outlet/>
       </Content>
        </Layout>
      
      </Layout>
    </Space>
    
      </div>
    )
  }
}
