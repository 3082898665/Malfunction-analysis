import React, { useRef, useState } from 'react'
import { Radio,Select } from 'antd';
import {  AwesomeButtonProgress } from "react-awesome-button";
import Mymodule from '../echarts/MyModel'
import style from './comp.module.css'
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

export default function Mycomp() {
const options=[
    {
      value: 'jack',
      label: 'newtran_02.csv',
    },
    {
      value: 'lucy',
      label: 'validate_1000.csv',
    },
   
  ]
  const optionss=[
    {
      value: 'jack',
      label: '随机森林',
    },
    {
      value: 'lucy',
      label: 'Xgboost',
    },
  ]
const allr=useRef()
const onr=useRef()
const twor=useRef()
const threer=useRef()
const four=useRef()
const fiver=useRef()
const sixr=useRef()
  let user=allr
function go(rrr){
  //comp_selsizec__yUol5
  console.log(user)
  if(user){
    user.current.className='comp_selsizec__yUol5'
  }
  rrr.current.className='comp_change__NQPbO'
  user=rrr
} 
const [showdata,setshow]=useState(false)
  return (
    <div className={style.all}>
     <div className={style.head}>
<Radio checked >同一数据集</Radio>
     </div>
     <div className={style.sel}>
      <div className={style.selchild}>
        算法选择：
      <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={optionss}
  />
      </div>
      <div className={style.selchild}>
        算法选择：
      <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={optionss}
  />
      </div>
      <div className={style.selchild}>
        数据集选择：
      <Select
    showSearch
    placeholder="同一数据集"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={options}
  />
      </div>
      <div style={{marginTop:'-1px',marginLeft:'20px'}}>
  <AwesomeButtonProgress type="primary" onPress={async (element, next) => {
                              setTimeout(()=>{
                                next();
                                setshow(true)
                              },1000)
                                }}>比较模型</AwesomeButtonProgress>
  </div>
     </div>
     <div className={style.data} style={{display:showdata?'':'none'}}>
         <div className={style.part}>
           <div style={{fontSize:'13px', height:'30px',lineHeight: '30px'}}>
           随机森林平均准确率
           </div>
           <div className={style.myfont}>
            78.29%
           </div>
           <div className={style.pdetail}>
            <span className={style.pdata} >
              下载次数：20次
            </span>
            <span style={{paddingLeft:'10px'}}>
              使用次数：20次
            </span>
           </div>
         </div>
         <div className={style.part } >
           <div style={{fontSize:'13px', height:'30px',lineHeight: '30px'}}>
           比较分析
           </div>
           <div style={{fontSize:'13px', height:'30px',lineHeight: '30px'}}>
          Xgboost算法准确率更高
           </div>
           <div style={{fontSize:'13px', height:'30px',lineHeight: '30px'}}>
          随机森林算法具有较强的稳定性
           </div>
         </div>
         <div className={style.part}>
           <div style={{fontSize:'13px', height:'30px',lineHeight: '30px'}}>
           xgboost平均准确率
           </div>
           <div className={style.myfont}>
            90.71%
           </div>
           <div className={style.pdetail}>
            <span className={style.pdata} >
              下载次数：10次
            </span>
            <span style={{paddingLeft:'10px'}}>
              使用次数：5次
            </span>
           </div>
         </div>
     </div>
     <div className={style.maincontain} style={{display:showdata?'':'none'}}>
        <div className={style.sellist}>
          <div className={style.datahead}>
            趋势分析
          </div>
          {/* <div className={style.selsize}>
            <span className={style.smile}>  故障类型</span>
            <div className={style.selul}>
            <span className={style.change} ref={allr} onClick={()=>go(allr)}>f1-score</span>
            <span className={style.selsizec} ref={onr} onClick={()=>go(onr)}>故障0</span>
            <span className={style.selsizec} ref={twor} onClick={()=>go(twor)}>故障1</span>
            <span className={style.selsizec} ref={threer} onClick={()=>go(threer)}>故障2</span>
            <span className={style.selsizec} ref={four} onClick={()=>go(four)}>故障3</span>
            <span className={style.selsizec} ref={fiver} onClick={()=>go(fiver)}>故障4</span>
            <span className={style.selsizec} ref={sixr} onClick={()=>go(sixr)}>故障5</span>
            </div>
            
          </div> */}
          {/* <div className={style.selsize} style={{marginTop:'20px'}}>
            <span className={style.smile}>测试次数</span>
            <div className={style.selul}>
            <span className={style.change} ref={allr} onClick={()=>go(allr)}>7次</span>
            <span className={style.selsizec} ref={onr} onClick={()=>go(onr)}>30次</span>

            </div>
            
          </div> */}
          <div className={style.ech}>
<Mymodule/>
          </div>
        </div>
        
     </div>
    </div>
  )
}
