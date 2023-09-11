import React,{ useEffect, useState } from 'react'
import {
    useTransition,
    useSpring,
    useChain,
    config,
    animated,
    useSpringRef,
  } from '@react-spring/web'
  import data from './data'
  import styles from './styles.module.css'
  
export default function Mytrain({openshow,datas}) {
    const [open, set] = useState(false)
    const [list,setlists]=useState([])
    const [f1,setf1]=useState()
useEffect(()=>{
if(datas.length>1){
  let logg=[]
setlists(datas)
    console.log(logg)
    setf1(datas[6][0])
}
},[datas])
    const springApi = useSpringRef()
    const { size, ...rest } = useSpring({
        ref: springApi,
        config: config.stiff,
        from: { size: '50%', background: 'black' },
        to: {
          size: open ? '100%' : '50%',
          background: open ? 'white' : 'black',
        },
      })
      const transApi = useSpringRef()
      const transition = useTransition(open ? data : [], {
        ref: transApi,
        trail: 400 / data.length,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
      })
      useChain(open ? [springApi, transApi] : [transApi, springApi], [
        0,
        open ? 0.1 : 0.6,
      ])
      let assist=1
  return (
    <div className={styles.wrapper}  style={{display:openshow==true?'block':'none'}}>
        
    <animated.div
      style={{ ...rest, width: size, height: size }}
      className={styles.container}
      onClick={() => set(open => !open)}>
      {transition((style, item) => (
        <animated.div
          className={styles.item}
          style={{ ...style, background: item.css,fontSize:'18px' }}
        >
            <span style={{fontSize:'15px',position:'relative',top:'-25px',left:'5px'}}>
            {
            item.name
        } 
        <span className={styles.data}>
        
        {/* {(list[item.ind].f1*100).toFixed(2)}% */}
        {list[item.ind][2]}
        </span>
     
            </span>
        </animated.div>
      ))}
      <span className={styles.alldata} style={{display:open==false?'block':'none'}}>
       Macro_F1：{f1}
      </span>
    </animated.div>
  </div>
  )
}
