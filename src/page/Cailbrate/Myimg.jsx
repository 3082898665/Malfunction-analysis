import React,{useState,useEffect} from 'react'
// import { useTransition, animated } from '@react-spring/web'
// import pic from '../../assets/pic/Cailbrate.png'
import Histogram from './echaets/Histogram'
import FanHistogram from './echaets/FanHistogram';
import ThreeHistogram from './echaets/ThreeHistogram';
import styles from './index.module.css'
export default function Myimg({typeof1,openshow,data}) {
  const [datas,setdata]=useState([])
  const [f1,setf1]=useState()
  useEffect(()=>{
    if(data.length>1){
      for(let i=0;i<6;i++){
        setdata((old)=>{
          return [...old,data[i]]
        })
    }
  setf1(data[6][0])
  console.log(data)
    }

  },[data])

 if(typeof1==1&&data.length>1){
  return (
    <div className={styles.gram} style={{display:openshow==true?'':'none',marginTop:'40px'}}>
    <Histogram data={data}/>
 
    </div>
     )
 }
 else if(typeof1==2){
  // console.log('start')
 return (
    <div className={styles.gram} style={{display:openshow==true?'':'none',marginTop:'20px'}}>
   <FanHistogram data={data}/>
    </div>
       
     )
 }
 else if(typeof1==3){
  return (
    <div className={styles.gram} style={{display:openshow==true?'':'none',marginTop:''}}>
 
    <ThreeHistogram datas={data}/>
    </div>
       
     )
 }
 
}
