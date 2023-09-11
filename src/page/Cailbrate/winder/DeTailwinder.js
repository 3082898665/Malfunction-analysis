import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../detail.module.css'
const LocalizedModal = ({data}) => {
  const [open, setOpen] = useState(false);
  const [datas,setdata]=useState([])
  const [f1,setf1]=useState()
  useEffect(()=>{
    if(data.length>1){
      for(let i=0;i<6;i++){
        setdata((old)=>{
          return [...old,data[i]]
        })
    }
  setf1(data[6][0])
    }

  },[data])
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Button  onClick={showModal} style={{width:'290px',fontSize:'20px',height:"50px",lineHeight:'40px'}}>
        故障分类准确率展示
      </Button>
      <Modal
        title="故障分类"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
      >
    <div className={style.maintain}>
       <ul className={style.mainul}>
        <tr className={style.maintr}>
          <td>故障类型</td>
          <td>precision</td>
          <td>recall</td>
          <td>f1-score</td>
          <td>support</td>
        </tr>
        {data.length>1?
          datas.map((item,index)=>{
            return (
<tr className={style.maintr}>
<td>{index}</td>
          <td>{item[0]}</td>
          <td>{item[1]}</td>
          <td>{item[2]}</td>
          <td>{item[3]}</td>
        </tr>
            )
          }):<></>
        }
        <br></br>
 

        <tr className={style.containtr}>
          <td>Macro_F1</td>
          <td>{
            !data.length>1?'0.80':f1
            }</td>
        </tr>
       </ul>

    </div>
      </Modal>
    </>
  );
};
const DeTailwinder = ({data}) => {
  const [modal1, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal1.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消',
    });
  };
  return (
    <>
      <Space>
        <LocalizedModal data={data}/>

      </Space>
      {contextHolder}
    </>
  );
};
export default DeTailwinder;