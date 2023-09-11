import React, { useEffect, useState } from 'react'
import style from './main.module.css'
import Xlmodule from '../../../../assets/pic/xlmodule.png'
import Yzmodule from '../../../../assets/pic/yzmodule.png'
import Allmodule from '../../../../assets/pic/allmodule.png'
import {getUserCount,getModelCreator} from '../../../../request/api'
export default function Mydata({selid}) {
  const [ca,setca]=useState('');
  const [nums,setuseStatenums]=useState(0);
    useEffect(()=>{
      if(selid){
        getUserCount(1).then(res=>{
          console.log(res.data.data);
        setuseStatenums(res.data.data)
              })
              getModelCreator(selid).then(res=>{
                console.log(res.data.data);
                setca(res.data.data)
              })
      }
    
    },[selid])


  return (
    <div className={style.mydata}>
         <div className={style.data}>
         <div className={style.part} style={{ marginLeft: '9%'}}>
           <div style={{fontSize:'15px',fontWeight:'550', height:'30px',lineHeight: '30px'}}>
           <img src={Allmodule} alt='null' className={style.pic}>
           </img>
           模型准确率
           </div>
           <div className={style.testfont}>
          {Number(ca[0]+ca[1])}
            <span style={{fontSize:'14px',marginLeft:'5px'}}>
         %
            </span>
           </div>
           <div className={style.pdetail}>
            <span className={style.pdata} >
            
            </span>
           </div>
         </div>

         <div className={style.part}>
           <div style={{fontSize:'15px',fontWeight:'550', height:'30px',lineHeight: '30px'}}>
           <img src={Xlmodule} alt='null' className={style.pic}>
           </img>
           算法平均准确度
           </div>
           <div className={style.testfont} >
            78.12
            <span style={{fontSize:'14px',marginLeft:'5px'}}>
         %
            </span>
           </div>
           {/* <div className={style.pdetail}>
            <span className={style.pdata} >
              模型准确度:No1
            </span>
           </div> */}
         </div>
         <div className={style.part}>
           <div  style={{fontSize:'15px',fontWeight:'550', height:'30px',lineHeight: '30px'}}>
           <img src={Yzmodule} alt='null' className={style.pic}>
           </img>
           算法使用次数
           </div>
           <div className={style.testfont}>
            {nums}<span style={{fontSize:'14px',marginLeft:'5px'}}>
         次
            </span>
           </div>
           <div className={style.pdetail}>
            <span className={style.pdata} >
              
            </span>
           </div>
         </div>
     </div>
    </div>
  )
}
