import React  from 'react'
import style from './Mymodule.module.css'
import { useState } from 'react';
import Search from './Search/Search'
import MyTable from './Table/MyTable'
import Mypogn from './MyPagination/Mypogn'
export const ThemeContext = React.createContext("light");

export default function Mark (){

  //搜索选择框
  const [arrnum,setarrnum]=useState(0)
     //选择状态框
  //父子传值操作
  const [theme, setTheme] = useState("all");
  const [selearr, setSelearr] = useState([]);
  // setSelectedItems({})
return (
<div>

<div className={style.all} >
  <Search setTheme={setTheme}  setSele={setSelearr} arrnums={arrnum}/>
<div className={style.data} >
<MyTable value={theme} arr={selearr} setanum={setarrnum}/>
</div>
<div className={style.pogn}>
{/* <Mypogn/> */}
</div>
          </div>
            </div>

);
}

