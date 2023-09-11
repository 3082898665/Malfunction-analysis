import React, { useEffect, useState } from 'react'
import { Table,Badge } from 'antd';
import {useNavigate} from 'react-router-dom'
import {publish} from 'pubsub-js'
import style from '../../../Mymodule/Mymodule.module.css'
import {getdatalist,delectlist,deleteModelDto} from '../../../../request/api'
import { Input,message, Popconfirm  } from 'antd';
export default function MyTable({ value, arr,setarrnums }) {
  const confirm = (value) => {
    console.log(value)
     setarrnums(old=>old-1)
    deleteModelDto(value).then(res=>{
      console.log(res.data)
     
    success()
    setdetail([])
    setdata([])
    initdata()
  })
    message.success('删除成功');
  };
  const cancel = (e) => {
   
  };
  const columns = [
    {
      title: '数据名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据ID',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'upgradeNum',
      render: (data) => <Badge status={data[0]} text={data[1]} />,
        //success | processing | default | error | warning
  
    },
    {
      title: '文件类型',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '创建日期',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'operation',
      dataIndex:'action',
      render: (value) => <div>
        {/* <span className={style.leading}  onClick={()=>jump(value)}>导入</span> */}
        &nbsp;&nbsp;
        <Popconfirm
    title="删除这个模型"
    description="删除这个模型将删除所有有关模型的信息"
    onConfirm={()=>confirm(value[0])}
    onCancel={cancel}
    okText="确定"
    cancelText="取消"
  >
   <span   style={{color:'rgb(22,119,255',cursor:'pointer'}}>删除</span>
  </Popconfirm>
     </div>,
    },
  ];
  //外壳
 
//跳走到导入界面
const navigate = useNavigate()
function jump(value){
  console.log(value)

  navigate('/contain/leading',{state:{name:value[1],id:value[0]}})
}
function create(data){
// /contain/load
  // navigate('/contain/create',{state:{name:data.name,id:data.id}})
  navigate('/contain/load')
}
const [data,setdata]=useState([])
const [detail,setdetail]=useState([])
useEffect( ()=>{
 initdata()
},[])
console.log(data)
 
const [messageApi, contextHolder] = message.useMessage();

const success = () => {
  messageApi.open({
    type: 'success',
    content: 'This is a success message',
  });
};

 function initdata(){
  getdatalist().then(res=>{
    const datan=res.data.data;
    for(let k=0;k<datan.length;k++){
      setdetail(old=>{
        const newde=[...old]
        newde.push({name:datan[k].name,id:datan[k].id})
        return newde
      })
      let logger=[];
      for (let i = 0; i <datan[k].models.length; i++) {
        let dui=[]
        if(datan[k].models[i].done==2||datan[k].models[i].done==3){
          dui=['success','已完成']
        
        logger.push({
          key: i.toString(),
          name:  datan[k].models[i].name,
          platform:  datan[k].models[i].id,
          state:dui,
          creator: 'pkl',
          createdAt: datan[k].models[i].createdAt,
          action:[datan[k].models[i].id,datan[k].models[i].name],
        });
        setarrnums(old=> old+1)
      }

    }
     setdata(old=>{
      const newa=[...old,logger];
      logger=[]
    return newa
     })
    }
  })
} 
function delmodell(id){

}
 async function del(id){
 await delectlist(id).then(async res=>{
  console.log(11)
    success()
    setdetail([])
    setdata([])
    initdata()
       })

}


  return (
    <div>
       {contextHolder}
      {
        data.map((item,index) => {
          return (
            <div className={style.table} key={index}>
              <div className={style.tabtit}>
                <div className={style.titr}>
                  <span>
                  {detail[index].name}
                    </span>
               
                </div>
                <div><a className={style.link} onClick={()=>create(detail[index])}>下载</a></div>
              </div>
              <Table
                columns={columns}
                dataSource={data[index]}
                size="midFdle"
                key={detail[index].id}
              />
            </div>
          )
        })
      }
    </div>
  )
}

