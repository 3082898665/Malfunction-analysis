import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import style from './single.module.css'
import Mydata from './forest/Mydata';
import Myshowpage from './forest/Myshowpage';
import Myshowpage2 from './forest/Myshowpage2';
import Mysellist from './forest/Mysellist'
import Forset from '../../../assets/pic/random-forest.png'
import {getxldata} from '../../../request/api'
import Nodata from '../../../assets/pic/nodata.png'
export default function Singlemo() {
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
            选择模型为：{name}
            <img src={Forset} alt='null' className={style.for} style={{display:showreal?'':'none'}}></img>
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
