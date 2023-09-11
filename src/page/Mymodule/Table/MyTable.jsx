import React, { useEffect, useState } from 'react'
import { Table,Badge } from 'antd';
import {useNavigate} from 'react-router-dom'
import {publish} from 'pubsub-js'
import style from '../Mymodule.module.css'
import {getdatalist} from '../../../request/api'
import {delectlist,deleteModelDto} from '../../../request/api'
import { Input,message, Popconfirm  } from 'antd';

export default function MyTable({setanum}) {
  const confirm = (value) => {
   del(value)
   setanum(old=>old-1)
    message.success('删除成功');
  };
  const cancel = (e) => {
    console.log(e);
  };
 
  const columns = [
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据集ID',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: '模型版本',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: '训练状态',
      dataIndex: 'state',
      key: 'upgradeNum',
      render: (data) => <Badge status={data[0]} text={data[1]} />,
        //success | processing | default | error | warning
  
    },
    {
      title: '验证状态',
      dataIndex: 'state1',
      key: 'upgradeNu1m',
      render: (data) => <Badge status={data[0]} text={data[1]} />,
        //success | processing | default | error | warning
  
    },
    {
      title: '准确率',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '训练日期',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'operation',
      dataIndex:'action',
      render: (value) => <div><span className={style.leading}  onClick={()=>jump(value)}>导入数据集</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <Popconfirm
    title="删除"
    description="是否删除这个模型吗?"
    onConfirm={()=>confirm(value[0])}
    onCancel={cancel}
    okText="确定"
    cancelText="取消"
  >
    {/* onClick={()=>del(value[0])} */}
    <a  >删除</a>
  </Popconfirm>
     
      </div>,
    },
  ];

  const [data,setdata]=useState([])
const [detail,setdetail]=useState([])
useEffect(()=>{
 initdata()
},[])
const [messageApi, contextHolder] = message.useMessage();

const success = () => {
  messageApi.open({
    type: 'success',
    content: '删除成功',
  });
};
 async function initdata(){
 await getdatalist().then(res=>{
    const datan=res.data.data;
    console.log(datan)
     console.log(datan[0].models.length)
    
    for(let k=0;k<datan.length;k++){
      let logger=[];
      setdetail(old=>{
        const newde=[...old]
        newde.push({name:datan[k].name,id:datan[k].id})
        return newde
      })
      for (let i = 0; i < datan[k].models.length; i++) {
        let dui=[]
        let yz=[]
        if(datan[k].models[i].done==1||datan[k].models[i].done==0){
    
      dui=['processing','未完成']
        }else{
          dui=['success','已完成']
        }
        if(datan[k].models[i].done==3){
          yz=['success','已完成']
        }else{
          yz=['processing','未完成']
        }
        logger.push({
          key: i.toString(),
          name:  datan[k].models[i].name,
          platform:  datan[k].models[i].id,
          // version
          version:datan[k].models[i].version?datan[k].models[i].version:"无版本号",
          state:dui,
          state1:yz,
          creator: datan[k].models[i].creator?datan[k].models[i].creator:'未训练'  ,
          createdAt: datan[k].models[i].createdAt,
          action:[datan[k].models[i].id,datan[k].models[i].name],
        });
        setanum(old=>{
          return old+1
        })
      }
  
     setdata(old=>{
      const newa=[...old,logger];
      logger=[]
    return newa
     })
    }
  })
}
console.log(data)
  //外壳
  function del(id){
console.log(111)
deleteModelDto(id).then(res=>{
success()
setdata([])
initdata()
   })
  }


//跳走到导入界面
const navigate = useNavigate()
function jump(value){
 
  navigate('/contain/leading',{state:{name:value[1],id:value[0]}})
}
//跳转创建数据集操作
function jumpxl(data){
  // console.log(de)
// debugger
navigate('/contain/create',{state:{name:data.name,id:data.id}})
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
                <div><a className={style.link} onClick={()=>jumpxl(detail[index])}>创建预模型</a></div>
              </div>
              <Table
                columns={columns}
              key={detail[index].id}
                dataSource={data[index]}
                size="midFdle"
              />
            </div>
          )
        })
      }
    </div>
  )
}

