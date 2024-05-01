import { ExclamationCircleOutlined, FileExcelOutlined } from '@ant-design/icons';
import { Button, Modal, Space, message, Select } from 'antd';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import style from '../yzmo.module.css'
import { heightyz } from '../../../request/api'
const LocalizedModal = ({ setyzopen, show, ids, setyz, setyzload }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const [open, setOpen] = useState(false);
  const showModal = () => {
    if (show) {
      setOpen(true);
    } else {
      warning()
    }
  };
  const hideModal = () => {
    setOpen(false);
  };


  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: '没有选择模型，请继续选择',
    });
  };
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);

  const inputRef = useRef();

  const changeHandler = (event) => {
    // 获取文件输入框的值
    console.log(event.target.files[0])
    setSelectedFile((oldData) => [...oldData, event.target.files[0]]);
    setIsFilePicked(true);
  };
  const chooseFile = () => {
    // 触发文件选择窗口
    inputRef.current.click();
  };
  function dellist(data) {
    console.log(data);

    setSelectedFile((oldData) => oldData.filter((item, index) => item.name !== data.name));
  }
  const clearInput = () => {
    // 清空文件输入框的值
    inputRef.current.value = null;
  };

  const formData = new FormData();

  const sub = () => {
    setyzload(true)
    setOpen(false);
    setyzopen(true);
    const files = [...selectedFile]

    setIsFilePicked(false)
    setSelectedFile((oldData) => []);

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
      console.log(formData.get('file'))
    }
    const peo = { file: files[0] }
    axios.post('http://192.168.182.188:10010/result/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Token': localStorage.getItem('token')
      }
    }).then(res => {
      console.log(res.data)
      heightyz([ids, localStorage.getItem('maintype')]).then(resd => {
        const data = resd.data.data.results
        console.log(resd.data.data.results)
        for (let i = 0; i < 7; i++) {
          setyz(old => {
            return [...old, data[i]]
          })
        }
        success();

        const hisarr = { modelId: localStorage.getItem(`nigm`), fileId: localStorage.getItem('nigw'), type: '验证模型' }
        console.log(hisarr)
        axios.post('http://192.168.182.188:10010/history/save', hisarr, {
          headers: {
            'Content-Type': 'application/json',
            'Token': localStorage.getItem('token'),
          }
        }).then(res => {
          console.log(res.data)

        })


        setyzload(false)
      })

    })

    console.log(formData.get('file'))
  }

  return (
    <>
      {contextHolder}
      <Button onClick={showModal}>
        开始验证
      </Button>
      <Modal
        title="验证数据集"
        open={open}
        onOk={sub}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
      >
        <div className={style.maintain}>
          <div className={style.showcon} >
            文件

            <div>
              <input
                type="file"
                ref={inputRef}
                onChange={changeHandler}
                onClick={clearInput}
                accept=".xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                style={{ display: "none" }}
              />
              <button onClick={chooseFile} className={style.upload}>选择文件</button>
              {isFilePicked ? (
                <div>
                  {selectedFile.map((item, index) => {
                    return (<div key={item.name}>
                      <FileExcelOutlined />
                      {item.name}
                      <span className={style.del}
                        onClick={() => dellist(item)}>删除</span>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>

                    </div>)
                  })}

                </div>
              ) : (
                <p>没有选择任何文件</p>
              )}
            </div>
          </div>

        </div>
      </Modal>
    </>
  );
};
const Yzwinder = ({ setyzopens, openshow, myid, setyzdm, setyzloading }) => {
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
        <LocalizedModal setyzopen={setyzopens} show={openshow} ids={myid} setyz={setyzdm} setyzload={setyzloading} />

      </Space>
      {contextHolder}
    </>
  );
};
export default Yzwinder;