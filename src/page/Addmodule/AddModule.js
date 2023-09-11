import React,{Suspense, useEffect, useState} from 'react'
import style from'./index.module.css'
import Dataget from './child/Dataget'
import Info from './child/Info'
export default function AddModule() {
    const [dataopen,setdataopen]=useState(true)
    const [data1show,setdatashow]=useState(false)
    const [sellist,setlist]=useState([])
    const [showyz,setshowyz]=useState(true)           //展示右方数据
   const [init,setinit]=useState(false)
  return (
    <div className={style.contain}>

        <div className={style.left}>
           <Info  setdata={setdataopen} Sellist={setlist} setshow={setshowyz} seti={setinit}/>
        </div>
        <div className={style.diver}></div>
        <div className={style.right}>
            <Dataget   data={dataopen} mylist={sellist} show={showyz} initr={init} />
        </div>
        </div>
  )
}
