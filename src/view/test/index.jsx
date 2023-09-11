import React, { useEffect, useState } from 'react';
import {
  HashLoader

} from 'react-spinners';

// 定义一个样式对象，设置组件的位置和大小
const override = {
  position: 'fixed',
  top: 0,
  left: 0,
  marginTop:'-15%',
  marginLeft:'-25%',
  width: '150%',
  height: '160%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgb(242,242,242)',
  opacity: "0.5",
  paddingRight:'100px'
};



export default function App() {
  useEffect(()=>{
    setTimeout(()=>{
      setData(false)
      console.log(data)
    },3000);//3s后输出一次"Hello"
  },[])
  const [data,setData]=useState(true)
  return (
    <div className="App">
      <h1>React Spinners Demo</h1>
      <HashLoader

        color="blue" loading={data} size={50} cssOverride={override} speedMultiplier={0.7}/>
        <button >adadada</button>
    </div>
  );
}
