import React, { useEffect, useState } from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import style from './index.module.css'
import {Button} from 'antd';
import {PlusOutlined } from '@ant-design/icons';
import {publish} from 'pubsub-js'
import Mytable from './Mytable'

import {getsjname} from '../../../../request/api'
export default function Mystepone() {
  const [namef,setfname]=useState(null)
  // const [namef,setfname]=useState('name')//测试版本
  const {state}=useLocation()

    //选择数据个数
    const [leng,setLeng]=useState(0)
    useEffect(()=>{
      localStorage.setItem('hiswj',state.id)
      getsjname(state.id).then(res=>{
        setfname(res.data.data)
      })
  
    publish('changelen',leng)
    
    },[leng])
  
  const options = [];
  for (let i = 10; i < 36; i++) { 
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }


  //创建数据
  const navigate=useNavigate()
  function create(){
   navigate('/contain/create',{state:{name:namef,id:state.id}})
  }

  //数据填充

  return (
    <div className={style.all}
    >
      <div className={style.tit}>模型预准备</div>
      <div className={style.contain}>
        <div className={style.contit} style={{ marginTop: '-20px' }}>模型文件夹</div>
        <div className={style.conmain}>
          {namef}
        </div>
      </div>
      <div  className={style.create}>
        <div className={style.seleasist}>
          <div className={style.contit} style={{ marginTop: '20px' }}>训练集选择</div>
          <div className={style.conmain} style={{ marginTop: '20px' }}>
          <Button  icon={<PlusOutlined />} shape="round"  onClick={create} >
            模型预创建
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
          </div>
        </div>
        <div className={style.seleasist}>
          <div className={style.contit} style={{ marginTop: '20px' }}></div>
          <div className={style.conmain} style={{marginTop:'30px'}}>
          <Mytable   setlen={setLeng}  fileid={state.id}/>
          <div className={style.pag}>
            <span className={style.allnum}>已选择: {leng} 条</span>
          {/* <MyPagination /> */}
          </div>
          
          </div>
        </div>
       
      </div>
    </div>
  )
}
