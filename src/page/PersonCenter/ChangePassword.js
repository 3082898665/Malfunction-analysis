import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Input, message, } from 'antd';
import React, { useState } from 'react';
import style from './index.module.css'


const LocalizedModal = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const ischange = () => {
    console.log(pass, newpass)
    if (pass !== newpass) {
      error()
    } else {
      messageApi.open({
        type: 'success',
        content: 'This is a success message',
      });
      setnewpass(null)
      setpass(null)
      setOpen(false);
    }
  };
  const [pass, setpass] = useState()
  const [newpass, setnewpass] = useState()
  function setopass(e) {
    setpass(e.target.value)
  }
  function setnpass(e) {
    setnewpass(e.target.value)
  }



  return (
    <>
      {contextHolder}
      <Button onClick={showModal} type="primary" >
        密码修改
      </Button>
      <Modal
        title="密码修改"
        open={open}
        onOk={ischange}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
      >
        <div className={style.pacon}>
          <div className={style.passname}>
            旧密码
          </div>
          <div className={style.passin}>
            <Input placeholder="旧密码" value={pass} onChange={setopass} type='password' />
          </div>
        </div>
        <div className={style.pacon}>
          <div className={style.passname}>
            新密码
          </div>
          <div className={style.passin}>
            <Input placeholder="新密码" value={newpass} onChange={setnpass} type='password' />
          </div>
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