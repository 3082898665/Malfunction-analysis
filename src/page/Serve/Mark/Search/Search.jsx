import React from 'react'
import { Select} from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import style from '../Mark.module.scss'
import { AwesomeButton } from "react-awesome-button";
export default function Search({setTheme,setSele,newarr}) {
    const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => { 
       return !selectedItems.includes(o)});
       //改变状态
    const handleChange = (value) => {
      console.log(`selected ${value}`);
      setTheme(value)
    }
    //改变数组值
    function selechange(selectedItems){
        // console.log(selectedItems)
        setSele(selectedItems)
        setSelectedItems(selectedItems)
          }
          const navigate = useNavigate()
          //跳转创建数据集操作
          function jump(){
  navigate('/contain/create')
          }
  return (
    <div className={style.but}>
              <div className={style.selekuan}>
    {/* <Select
          defaultValue="状态选择"
          style={{
            width: 120,
            
          }}
          onChange={handleChange}
          options={[
            {
              value: 'success',
              label: '已完成模型',
            },
            {
              value: 'doing',
              label: '所有模型',
            },
          ]}
        /> */}
        算法数量：2
              </div>
              <div className={style.kuan}>
              {/* <Select
          mode="multiple"
          placeholder="搜索或选择数据集"
          value={selectedItems}
          onChange={selechange}
          style={{
            width: '250px',
          }}
          options={filteredOptions.map((item) => 
            { 
          
              return{
            value: item,
            label: item
          }})}
        /> */}
        模型数量：{newarr}
              </div>
              </div>
  )
}
