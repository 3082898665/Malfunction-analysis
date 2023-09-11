import React from 'react'
import style from './index.module.scss'
import { useNavigate,useLocation } from 'react-router-dom'
import { Dropdown, Space } from 'antd';
import head from '../../../../assets/pic/headlogo.jpg' 

export default function Myprivate() {
  const items = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/contain/person">
         个人中心
        </a>
      ),
      key: '0',
    },
  
    {
        label: (
            <a target="_blank" rel="noopener noreferrer" onClick={jump}>
            退出
            </a>
          ),
      key: '3',
     
    },
  ];
  const navigate = useNavigate()
  function jump(){
    navigate('/login')
  }
  return (
    <Dropdown
    menu={{
      items,
    }}
  >
    <div onClick={(e) => e.preventDefault()}>
      <Space>
   <img src={head} alt="" className={style.picimg}/>
    3082898665@qq.com
      </Space>
    </div>
  </Dropdown>
  )
}
