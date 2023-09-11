import React, { useEffect, useState } from 'react'
import style from './index.module.css'
import {Select,Badge, Input } from 'antd';
import { useLocation } from 'react-router-dom'
const options=[
  {size:0,p:0.64,r:0.81,f1:0.71,s:176},
  {size:1,p:0.61,r:0.84,f1:0.71,s:166},
  {size:2,p:0.73,r:0.45,f1:0.56,s:171},
  {size:3,p:1.0,r:0.88,f1:0.94,s:169},
  {size:4,p:0.97,r:0.85,f1:0.91,s:156},
  {size:5,p:0.99,r:0.92,f1:0.94,s:162},
]

export default function Mystepthird() {
const {state}=useLocation()

const  option=[
  {
    value: '1',
    label: '随机森林',
  },
  {
    value: '0',
    label: 'Xgboost',
  },
]
useEffect(()=>{
  if(state.data[0]!=1){

setfin(['success','已完成'])
}

},[state.data])
console.log(state.data)
const handleChange = (value) => {
  console.log(`selected ${value}`);
  localStorage.setItem('selsuan',value);
 
  if(value==0){
    setshowx(true)
  }else{
    setshowx(false)
  }
  localStorage.setItem('xlver',value)
};

const [finish,setfin]=useState(['processing','进行中'])
const [showx,setshowx]=useState(false)
const [num,setnum]=useState(null)
const [bb,setbb]=useState('')
function changebb(e){
setbb(e.target.value)
localStorage.setItem('bb',e.target.value)
}
  return (
    <div className={style.all}
    >

      
      <div className={style.tit}>模型训练
      <div className={style.detail}>
      通过调用先前选择的训练集然后用预先训练好的算法，得到所需的模型
          </div></div>
      <div className={style.contain}>
        <div className={style.contit} style={{ marginTop: '-1px' }}>算法选择</div>
        <div className={style.conmain1}>
        <Select
      // defaultValue="1"
      placeholder='选择算法'
      style={{
        width: 160,
      }}
      onChange={handleChange}
      options={option}
    />
    <span style={{display:showx?'':'none'}} className={style.showx}> 迭代轮数： <Input style={{width:'100px'}} onChange={changebb} value={bb}></Input> </span>
        </div>
      </div>
      <div  className={style.create} >
        <div className={style.seleasist}>
          <div className={style.contit} style={{ marginTop: '5px' }}>
           状态：

          </div>
          <div className={style.conmain1} style={{ marginTop: '10px' }}>
          <Badge status={finish[0]} text={finish[1]} />
    
          </div>
        </div>
        {/* <div className={style.seleasist}  style={{display:state.ju?'block':'none'}} >
          <span className={style.contit} style={{ marginTop: '0px' }}>
           检测结果：

          </span>
          <span className={style.conmain} >
          <div >
       <table className={style.mainul}>
        <tr className={style.maintr}>
          <td>故障类型</td>
          <td>precision</td>
          <td>recall</td>
          <td>f1-score</td>
          <td>support</td>
        </tr>
        {
          data.map((item,index)=>{
            return (
<tr className={style.maintr} key={index}>
<td>{index}</td>
          <td>{item[0]}</td>
          <td>{item[1]}</td>
          <td>{item[2]}</td>
          <td>{item[3]}</td>
        </tr>
            )
          })
        }
        <div style={{height:'10px'}}>&nbsp;</div>
        <tr className={style.containtr}>
          <td>f1_score</td>
          <td>{
            state.data[0]==1?'0.80':f1
            }</td>
        </tr>
       </table>

    </div>
    
          </span>
        </div> */}
      </div>
    </div>
  )
}
