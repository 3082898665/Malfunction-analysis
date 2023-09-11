import React, { useState,useEffect } from 'react'
import style from './single.module.css'
import Mydata from './xgboost/Mydata';
import Myshowpage from './xgboost/Myshowpage';
import Myshowpage2 from './xgboost/Myshowpage2';
import Mysellist from './xgboost/Mysellist'
import Xg from '../../../assets/pic/XGBOOST.png'
import {getxldata} from '../../../request/api'
import Nodata from '../../../assets/pic/nodata.png'
export default function Singletwo() {
  const [show,setshow]=useState(false);
  const [forname,setfordata]=useState('');
  const [forid,setforid]=useState('')
  const [showreal,setreal]=useState(false);
  const [xlarr,setxlarr]=useState([])
  const [yzarr,setyzarr]=useState([])
  const [name,setname]=useState('')

  useEffect(()=>{
    if(forid){
      getxldata([forid,0]).then(res=>{
        console.log(res.data.data)
        setxlarr(res.data.data)
     })
     getxldata([forid,1]).then(res=>{
      console.log(res.data.data)
      setyzarr(res.data.data)
     })
    }
  
  },[forid])
  return (
    <div className={style.all}>

     <div className={style.maincontain}>
      <div className={style.title}>
           概要
           <div className={style.info} style={{display:showreal?'':'none'}}>
          选择的模型：{name}
          <img src={Xg} alt='null' className={style.for} style={{display:showreal?'':'none'}}></img>
           </div>
           <img src={Nodata} alt='null' className={style.picno} style={{display:!showreal?'':'none'}}></img>
      </div>
          <div className={style.fdata}>
            <div className={style.fdl}>
            {showreal&&(
        <Mydata selid={forid} />
      )

      } 
            </div>
            <div className={style.fdr}>
<Mysellist setfor={setforid} sel={setreal} setn={setname}/>
            </div>
          </div>
          <div className={style.sdata}>
<div className={style.sdl}>
{showreal&&(
    <Myshowpage  xl={xlarr} yz={yzarr} />
  )
  }
</div>
<div className={style.sdr}>
{showreal&&(
  <Myshowpage2/>
  )}
</div>
          </div>
     </div>
    </div>
  )
}
