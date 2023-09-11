import React, { useState } from 'react';
import {SlidersOutlined,BoxPlotOutlined,AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom'
import style from './index.module.css'
const items = [
  {
    label: '总体分析',
    key: 'allmodel',
    icon: <MailOutlined />,
  },
  {
    label: '随机森林算法分析',
    key: 'forestmodule',
    icon: <BoxPlotOutlined />,
  },
  {
    label: 'Xgboost算法分析',
    key: 'xgboostmodule',
    icon: <SlidersOutlined />,
  },
  {
    label: '算法比较',
    key: 'component',
    icon: <AppstoreOutlined />,
  }
];
const MyNavigate = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('allmodel');
  const onClick = (e) => {
    console.log('click ', e.key);
    setCurrent(e.key);
    navigate(e.key)
    
  };
  return <Menu onClick={onClick}  defaultSelectedKeys={[]}
  defaultOpenKeys={[]} 
  selectedKeys={[current]} 
  mode="horizontal" 
  items={items} />;
};
export default MyNavigate;