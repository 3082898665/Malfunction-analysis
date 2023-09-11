import React, { useState,useEffect } from 'react'
import style from './index.module.css'
import { Radio,Input,Select  } from 'antd';
import {publish} from 'pubsub-js'
import {getdatalist} from '../../../../request/api'
export default function Mystepone() {
    //进入本步骤必须填写信息
    const [option,setoption]=useState([])

    useEffect(()=>{
        getdatalist().then(res=>{
            const datan=res.data.data;
            for(let k=0;k<datan.length;k++){
                setoption(old=>{
                  const newde=[...old]
                  newde.push({label:datan[k].name,value:datan[k].id})
                  return newde
                })
            }
        })

    },[])
 

    //什么是选择框函数
    const [current,setCurrent]=useState(2);

    //数据填充
    const [Fint,setFint] =useState('');
    const [Fsec,setFsec] =useState('');
    const [selectva,setSelect]=useState(0)
    function changeF(event){
        setFint(event.target.value);

    }
    //传数据判断是否进入下一步骤

    function isnext(){

    }
 //选择事件
 const handleChange = (v) => {
    console.log(`Selected: ${v}`);
    localStorage.setItem('moxid',110)
    publish('onechild',{da:2,value:Fint,sel:v})
  };
  //创建新数据集
    function sub(){
        if(current==1){
            if(Fint!==''&&Fsec!==''){
             localStorage.setItem('moxid',120)
                 publish('onechild',{da:1,value:Fint,sel:0})
                }
            else     publish('onechild',{da:-1,value:0})
        }
    }
    function sub2(){
        if(current==1){
            if(Fint!==''&&Fsec!=='') {
              
                localStorage.setItem('moxid',120)
                publish('onechild',{da:1,value:Fint,sel:0})
                   }
            else     publish('onechild',{da:-1,value:2})
        } 
    }

    function changeS(event){
        setFsec(event.target.value)
    }

    function select(c){
        publish('onechild',-1)
        console.log(c.target.value)
        setCurrent(c.target.value)
    }
    return (
        <div className={style.all}
        >
            <div className={style.tit}>文件夹预准备</div>
            <div className={style.contain}>
                <div className={style.contit} style={{ marginTop: '-20px' }}>文件夹选择</div>
                <div className={style.conmain}>  
                <Radio.Group name="radiogroup" defaultValue={2} onChange={select}>
                    <Radio value={2}>选择已有文件夹</Radio>
                    <Radio value={1}>创建新的文件夹</Radio>
                  
                </Radio.Group> </div>
            </div>
            <div style={{display:current==1?'':'none',paddingBottom:'5%'}} className={style.create}>
                <div className={style.seleasist}>
            <div className={style.contit} style={{ marginTop: '-20px' }}>文件夹名称</div>
                <div className={style.conmain}>  
                <Input placeholder="名字" onChange={changeF} onBlur={sub}   />
                 </div>
                 </div>
                 <div className={style.seleasist}>
            <div className={style.contit} style={{ marginTop: '-20px' }}>备注(选填)</div>
                <div className={style.conmain}>  
                <Input placeholder="请填入" onChange={changeS} onBlur={sub2}/>
                 </div>
                 </div>
                 <div className={style.seleasist}>
            <div className={style.contit} style={{ marginTop: '-20px' }}>数据集导入类型</div>
                <div className={style.conmain}>  
                Excel
                 </div>
                 </div>
                    </div>
            
                    <div style={{display:current==2?'':'none',marginTop:'-60px',paddingBottom:'5%'}}>
                    <div className={style.seleasist}>
            <div className={style.contit} style={{ marginTop: '-20px' }}>文件夹选择</div>
                <div className={style.conmain}>  
                <Select
          onChange={handleChange}
          style={{
            width: 200,
          }}
          placeholder='文件夹选择'
          options={option}
        />
                 </div>
                 </div>
                        </div>
        </div>
    )
}
