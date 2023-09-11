import React from 'react'
import style from './index.module.scss'
import { Menu } from 'antd';
import { useState } from 'react';
import Private from './Myprivate'
import img from '../../../../assets/pic/logo_pro.png'
import './Myheader.scss'
import { useNavigate } from 'react-router-dom';

export default function MyHeader() {
  const items = [
    {
      label: (
        <img src={img} alt='adad' className={style.pic} onClick={jump}></img>
      ),
      key: 'mail1',
  
    },
 
  ];
  const nvigate=useNavigate();

  const [current, setCurrent] = useState('maill');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  function jump(){
nvigate('/contain/summary')
  }
  return (
    <div >
    
  <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} id={style.mu} />
  <span className={style.person}>
    <Private/>
  </span>
  </div>
  )
}
