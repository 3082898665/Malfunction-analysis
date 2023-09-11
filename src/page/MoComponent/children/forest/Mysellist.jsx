import React, { useEffect, useState } from 'react'
import style from './main.module.css'
import {getAllByType} from '../../../../request/api'
export default function Mysellist({setfor,sel,setn}) {
  const [arr,setarr]=useState([])
  useEffect(()=>{
    getAllByType(1).then(res=>{
      console.log(res.data);
      setarr(res.data.data)
    })
  },[])
  function selid(data){
    sel(true)
   setfor(data[0])
   setn(data[1])
  }
  return (

    <div className={style.mylist}>
      <div className={style.history}>
      所有模型
      </div>
      <div className={style.list}>
 
          {arr.map((item,index)=>{
            return (
              <div className={style.lichild} key={index} onClick={()=>selid([item.id,item.name])}>
              <div className={style.listl}>
              随机森林&nbsp; &nbsp;{item.name}
              </div>
                准确率：{item.creator1}
             </div>
            )
          })}
      
    
      </div>

      </div>
  )
}
