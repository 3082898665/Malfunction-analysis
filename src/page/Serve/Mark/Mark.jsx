import React  from 'react'
import style from './Mark.module.scss'
import './mark.css'
import { useState,useEffect } from 'react';
import Search from './Search/Search'
import MyTable from './Table/MyTable'
import Mypogn from './MyPagination/Mypogn'
import {datatable} from '../../../request/api'
export const ThemeContext = React.createContext("light");

export default function Mark (){
useEffect(()=>{
//   console.log(1111)
// datatable().then((res)=>{
//   console.log(res)
// })
},[])
  //搜索选择框
  const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

     //选择状态框
  //父子传值操作
  const [theme, setTheme] = useState("all");
  const [selearr, setSelearr] = useState([]);
  const [arrnum,setarrnum]=useState(0)
  // setSelectedItems({})
return (
<div>

<div className={style.all} >
  <Search setTheme={setTheme}  setSele={setSelearr} newarr={arrnum}/>
<div className={style.data} >
<MyTable value={theme} arr={selearr} setarrnums={setarrnum}/>
</div>
<div className={style.pogn}>
{/* <Mypogn/> */}
</div>
          </div>
            </div>

);
}

