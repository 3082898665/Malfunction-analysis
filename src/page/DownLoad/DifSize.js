import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import style from './detail.module.css'
const LocalizedModal = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  function getdata(){
    axios.post('http://localhost:5000/products/form'
    ).then(res => {
      console.log(res.data)
    })
  }
  const arr=[1,2,3,4,5,6]
  return (
    <>
      <Button  onClick={showModal}>
        小窗口展示
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
          <td>类型</td>
          <td>precision</td>
          <td>recall</td>
          <td>f1-score</td>
          <td>support</td>
        </tr>
        {
          arr.map(item=>{
            return (
<tr className={style.maintr}>
          <td>0</td>
          <td>precision</td>
          <td>recall</td>
          <td>f1-score</td>
          <td>support</td>
        </tr>
            )
          })
        }
        <br></br>
 
          <tr >
          <td className={style.containtr}>accuracy</td>
          <td>0.8</td>
        </tr>
        <tr className={style.containtr}>
          <td>f1_score</td>
          <td>0.8</td>
        </tr>
       </ul>

    </div>
      </Modal>
    </>
  );
};
const DeTailwinder = () => {
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
        <LocalizedModal />

      </Space>
      {contextHolder}
    </>
  );
};
export default DeTailwinder;