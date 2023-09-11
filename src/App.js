import React, { useState } from 'react'
import routes from './router';
import {Leva} from 'leva'
import {useRoutes} from 'react-router-dom'
import './App.css'
import {  ConfigProvider} from 'antd';
export default function App() {
  let element=useRoutes(routes)
  return (
    // 19A7CE
    <div>
<Leva collapsed/>
              {element}
             
              </div>
  )
}
