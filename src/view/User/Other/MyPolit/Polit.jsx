import {LineChartOutlined,MacCommandOutlined,PullRequestOutlined,DownloadOutlined,SettingOutlined, AppstoreOutlined,ReadOutlined,UserSwitchOutlined,HeatMapOutlined,RadarChartOutlined  } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { Menu } from 'antd';
import { useNavigate,useLocation } from 'react-router-dom'
import { publish,subscribe } from 'pubsub-js';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('概括', '/contain/summary', <AppstoreOutlined />),
  {
    type: 'divider',
  },

  // getItem('数据标注', '6'),
  getItem('数据总览', '/contain/mymodule',<ReadOutlined/>),
  getItem('我的模型', '/contain/mark',<UserSwitchOutlined/>),
  getItem('训练模型', '/contain/train/stepone',<HeatMapOutlined/>),
  getItem('验证模型', '/contain/cailbrate',<RadarChartOutlined/>),
  getItem('下载模型', '/contain/load',<DownloadOutlined/>),
  getItem('算法分析', '/contain/aymodel/allmodel',<LineChartOutlined />),
  getItem('模型添加', '/contain/addmodule',<PullRequestOutlined />),
  getItem('故障服务', '/contain/aiPage', <SettingOutlined/>),
  getItem('个人中心', '/contain/person',<MacCommandOutlined />)
//aymodel
];
// const navigate=useNavigate();
export default function Polit() {
  const location=useLocation()
  const [path,setPath]=useState('')
  useEffect(()=>{
    if(location.pathname!=null){
      setPath(location.pathname)
    }
   subscribe('onechild',(_,data)=>{
    setPath(data.data)
    })
  },[location.pathname])
  const navigate = useNavigate()


  let tit = ''
  const onClick = (e) => {
    if (e.key ==='/contain/summary') {
      tit = '概括'
    } else if (e.key === '/contain/mark') {
      tit = '我的模型'
    } else if (e.key === '/contain/load') {
      tit = '下载模型'
    } else if (e.key === '/contain/mymodule') {
      tit = '数据总览'
      
    }else if (e.key === '/contain/addmodule') {
      tit = '模型添加'
      
    } else if (e.key === '/contain/aiPage') {
      tit = '故障系统咨询机器人'
      
    }else if (e.key === '/contain/person') {
      tit = '个人中心'
      
    } else if (e.key === '/contain/aymodel/allmodel') {
      tit = '算法分析'
      
    } else if (e.key ==='/contain/train/stepone') {
      tit = '训练模型'
       publish('changetit', { data: tit })
    setPath(e.key)
      navigate('/contain/train/stepone',{state:{value:0}})
    } else if (e.key === '/contain/cailbrate') {
      tit = '验证模型'
    }
    publish('changetit', { data: tit })
    setPath(e.key)
    if(e.key !=='/contain/train/stepone')
     navigate(e.key)
  };
  return <>
    <Menu
      onClick={onClick}
      style={{
        height: '100%'
      }}
      defaultSelectedKeys={[]}
      defaultOpenKeys={[]}
      selectedKeys={[path]}
      mode="inline"
      items={items}
    >
     
    </Menu>
    </>
}

