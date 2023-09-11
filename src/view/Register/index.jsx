import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import { Input,ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import {sendyzm} from '../../request/api'
export default function () {
  const navigate=useNavigate();
  const [name,setname]=useState('');
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [email,setemail]=useState('');
const [isyzm,setyzm]=useState(0)
const [num,setnum]=useState(60)
const [yzm,setyzmnum]=useState('')
    function jump(){
      navigate('/login')
    }
function chan(event){
setusername(event.target.value)
}

function chanp(event){
    setpassword(event.target.value)
    }
    function chanemail(event){
      setemail(event.target.value)
      }
     let time=null
function sendyam(){
  if(isyzm==0){
    setyzm(1)
    
    sendyzm(username).then(res=>{
      console.log(res.data)
    })


time=setInterval(()=>{
    if(num>0){
      const n=num-1
      setnum((old)=>{
      
        const n=old-1
        return n
      })
    }
    if(num<=0){
   setnum(60)
   clearInterval(time)
   setyzm(0)
    }
    
},1000)
  }


}

  return <>
    <div className={style.all}>
    </div>
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: 'rgb(249, 154, 211, 0.749)',
      },
    }}
  >
    <div className={style.box}>
    <div className={style.title}>
     Sign for the system
    </div>
    <div className={style.bor}>
    <div className={style.font1} >
    邮箱
    </div>
    <Input placeholder="输入邮箱" value={username} onChange={chan} className={style.in}/>
    <div className={style.font} style={{marginTop:'50px'}}>
    验证码
    {/* <span style={{marginLeft:'125px'}}>name</span> */}
    </div>
    <Input placeholder="输入验证码"   value={username} onChange={chanp} className={style.in} style={{width:'150px'}} />
    <button className={style.but1} onClick={sendyam}>
      {isyzm==0?'发送验证码':
                 `${num}秒后发送`
      }
      
      </button>
    
    <div className={style.font} style={{marginTop:'10px'}}>
    密码
    </div>
    <Input placeholder="输入密码" value={password} onChange={chanp} className={style.in}/>
    </div>
    <button className={style.but} >Sign up</button>
    <div className={style.res}>Have a count ? <span className={style.resister} onClick={jump}>sign in</span></div>
       </div>
       </ConfigProvider>
    </>
}
