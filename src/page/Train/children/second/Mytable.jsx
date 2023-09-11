import React, { useEffect } from 'react'
import { Table,Space,Badge,message } from 'antd';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import {getwjinfo} from '../../../../request/api'


export default function Mytable({setlen,fileid}) {

  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.open({
      type: 'error',
      content: '该预模型还未导入数据集',
    });
  };


  const navigate = useNavigate()
  function jump(value){
    console.log(value)
  
    navigate('/contain/leading',{state:{name:value[1],id:value[0]}})
  }
  const columns = [
    {
      title: '数据名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '导入状况',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '训练状态',
      dataIndex: 'state',
      key: 'state',
      render: (s) =>
      (
        <Badge status={s[0]} text={s[1]} />
        )
    },
    {
        title: '操作',
        dataIndex: 'add',
        render: (s) => (

                      <Space size="middle">
                        <a onClick={()=>jump(s)}>导入数据集</a>  
                      </Space>
                    ),
      },
  ];
   const [option,setoption]=useState([])
useEffect(()=>{
getwjinfo(fileid).then(res=>{
const data=res.data.data;
console.log(data)
let logg=[]
let num=0
for(let i=0;i<data.length;i++){
  if(data[i].id){
    let datas;
    datas=['processing','未进行']
    if(data[i].done==1||data[i].done==0){
 
    logg.push({
      key: num,
      name: data[i].name,
      age:data[i].done==0?'未导入':'已导入',
      state:datas,
      id:data[i].id,
      add:[data[i].id,data[i].name],
      done:data[i].done
    });
    num++
  }
  }
  
  setoption(logg)
}
})

},[])


    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
      localStorage.setItem('xllength',newSelectedRowKeys.length)
      console.log(newSelectedRowKeys)
      let reall
      const selelist=[]
      for(let k=0;k<3;k++){
        localStorage.removeItem(`selelist${k}`)
      }
      let rleng=0
      for(let i=0;i<newSelectedRowKeys.length;i++){
         
          selelist[i]=option[i].id
          console.log(option[newSelectedRowKeys[i]])
          // selelist[i]=data[i].id  //测试版本
          // localStorage.setItem('selelist',selelist[newSelectedRowKeys].id)//测试版本
          if(option[newSelectedRowKeys[i]].done==1){
      localStorage.setItem(`selelist${i}`,option[newSelectedRowKeys[i]].id)
rleng=newSelectedRowKeys.length;

          }else{
error()
rleng=0
          }
      }

      setSelectedRowKeys(newSelectedRowKeys)
      setlen(rleng)
     
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: (changeableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            setSelectedRowKeys(newSelectedRowKeys);
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: (changeableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            setSelectedRowKeys(newSelectedRowKeys);
          },
        },
      ],
    };
    return(
<>
{contextHolder}
      <Table rowSelection={rowSelection} columns={columns} dataSource={option} />
      </>
    )
  
}
