import React, { useState } from 'react'
import { Button, message, Space } from 'antd';

import style from './index.module.scss'
import { Input,ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import {login} from '../../request/api'

export default function Login() {

  const navigate=useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: '成功登录',
    });
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content: '账户或密码错误',
    });
  };

  function jump1(){
    navigate('/register')
  }
    const [username,setusername]=useState();
    const [password,setpassword]=useState();
function chan(event){
setusername(event.target.value)
}
function chanp(event){
    setpassword(event.target.value)
    }

function loginf(){
  const arr=[username,password]
  login(arr).then(res=>{
   const data=res.data;
   if(data.code==0){
    error()
   }else{

console.log(data)
localStorage.setItem('token',data.data)
// success()
localStorage.setItem('logint',0)
    navigate('/contain/summary')
  }
  })
}

  return <>
    <div className={style.all}>
{contextHolder}
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
    <div className={style.font}>
    Username or Email Address
    </div>
    <Input placeholder="username"   value={username} onChange={chan} className={style.in} />
    <div className={style.font} style={{marginTop:'50px'}}>
    Password
    
    </div>
    <span className={style.for}>Forget ? </span>
    <Input placeholder="password" type='password' value={password} onChange={chanp} className={style.in}/>
    </div>
    <button className={style.but}  onClick={loginf} >Sign in</button>
    <div className={style.res}>Not a member ? <span className={style.resister} onClick={jump1}>sign up</span></div>
       </div>
       </ConfigProvider>
    </>
}
