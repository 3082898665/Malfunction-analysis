import React,{useEffect, useState} from 'react'
import style from './index.module.css'
import MyNavigate from './MyNavigate'
import {Outlet} from 'react-router-dom'
import {getModelCount,getModelFinish,getModelPercent} from '../../request/api'
export default function Mymo() {


  return (
    <div className={style.all}>
        <div className={style.head}>
       <MyNavigate/>
        </div>
        <div className={style.child}>
<Outlet/>
        </div>
    </div>
  )
}
