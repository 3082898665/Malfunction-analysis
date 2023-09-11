import React, { useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import style from './index.module.css'
import {useNavigate} from 'react-router-dom'
import { AwesomeButton } from "react-awesome-button";
import { FormOutlined, ToTopOutlined, FileExcelOutlined } from '@ant-design/icons';
import { Button, Modal, Radio, Collapse,message } from 'antd';
import load from '../../assets/pic/load.png'
import {addmodule } from '../../request/api'
import axios from 'axios';
const { Panel } = Collapse;
const text = `
  文本创建数据集是模型训练首要的操作.
  创建数据集及直接创建一个空的数据集，里面会有系统给的原先数据,
`;
const text1 = `
  文本创建并导入是一个便捷的操作.
  在创建途中直接跳过导入数据步骤,
  it can be found as a welcome guest in many households across the world.
`;
export default function Myleading() {
  const { state } = useLocation();
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '数据集导入成功，可以进行训练模型',
    });
  };
  //文件上传出现的显示框
  const [show, setShow] = useState(false);
  function onshow() {
    setShow(true);


  }
  //第一个弹出框：展示历史数据
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  //第二个弹出框：编写备注
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal1 = () => {
    setIsModalOpen(true);
  };
  const handleOk1 = () => {
    setIsModalOpen(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen(false);
  };
  //第三个弹出框：编写备注
  const [Topout, setTopout] = useState(false);
  const showTop = () => {
    setTopout(true);
  };

  const handleCancel2 = () => {
    setTopout(false);
    setShow(false);

  };
  //单选框
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  //文件上传

  const [selectedFile, setSelectedFile] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const inputRef = useRef();

  const chooseFile = () => {
    // 触发文件选择窗口
    inputRef.current.click();
  };

  const changeHandler = (event) => {
    // 获取文件输入框的值
    console.log(event.target.files[0])
    setSelectedFile((oldData) => [...oldData, event.target.files[0]]);
    setIsFilePicked(true);
  };

  function dellist(data) {
    console.log(data);

    setSelectedFile((oldData) => oldData.filter((item, index) => item.name !== data.name));
  }

  const clearInput = () => {
    // 清空文件输入框的值
    inputRef.current.value = null;
  };
  //提交表格
  const formData = new FormData();
  const sub = () => {
    const files = [...selectedFile]

    setIsFilePicked(false)
    setSelectedFile((oldData) => []);

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
      console.log(formData.get('file'))
    }
    const peo = { file: files[0] }
    axios.post('http://192.168.143.188:10010/result/upload', formData,{
      headers:{
      'Content-Type': 'multipart/form-data',
      'Token':localStorage.getItem('token')
    }
    }).then(res => {
      console.log(res.data)
      const id=state.id
    addmodule(id).then(res=>{
success();
setTimeout(() => {
  window.history.back();
}, 1000);

    })


    })
  
      console.log(formData.get('file'))
  }
  return (
    <div className={style.all}>
        {contextHolder}
      <div className={style.title}>
        数据导入
      </div>
      <div className={style.contain}>
        <div>
          <div className={style.contit}>
            <span className={style.show}>
            </span>  导入数据集信息
          </div>
          <div className={style.showdata}>
            数据名:&nbsp;{state.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;训练情况：未进行训练
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div style={{ height: '20px', lineHeight: '20px', marginTop: "-30px" }}>
              导入的信息：<span href="" onClick={showModal} style={{ color: 'rgb(36,147,248)', cursor: 'pointer' }}>历史导入数据</span>
              <Modal
                title="Basic Modal"
                open={open} key='20'
                // onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{
                  disabled: true,
                }}
                cancelButtonProps={{
                  disabled: true,
                }}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </div>
            <div style={{ height: '20px', lineHeight: '20px', marginTop: "15px" }}>
              备注：无<FormOutlined style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={showModal1} />
              <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk1} onCancel={handleCancel1}>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '-20px' }}>
          <div className={style.contit}>
            <span className={style.show}>
            </span>  导入数据操作
          </div>
          <div className={style.showdata}>
            数据集是否已导入：
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>已有</Radio>
              <Radio value={2}>没有</Radio>
            </Radio.Group>
            <div style={{ marginTop: '-10%' }}>
              上传格式：Excel
            </div>
            <div className={style.excel}>
              上传方式<Button icon={<ToTopOutlined />} style={{ marginLeft: '30px' }} onClick={showTop}>
                Download
              </Button>
              <Modal title=" 上传Excel文件" open={Topout} key='10'
                onCancel={handleCancel2}
                footer={[
                  <Button key="1" style={{ display: show === false ? '' : 'none' }} onClick={onshow}>
                    上传
                  </Button>,
                  <Button key="back" style={{ display: show === true ? '' : 'none' }} onClick={handleCancel2}>
                    确定
                  </Button>,
                  <Button key="submit" type="primary" onClick={handleCancel2}>
                    取消
                  </Button>
                ]} width={600}>
                <div className={style.topcon} style={{ display: show === false ? '' : 'none' }} key='1' onClick={onshow}>
                  1. 使用第一列作为待标注文本，每行是一组样本，首行为表头默认将被忽略，每组数据文本内容的字符数不超过512个字符（包括中英文、数字、符号等），超出的字符可正常保存，但可能无法参与训练。<br />
                  2. 文件类型支持xlsx格式，单次上传限制100个文件；文件格式示意图如下：

                  <div>
                    <img src={load} alt="" className={style.picimg} />
                  </div>
                </div>
                <div className={style.showcon} style={{ display: show === true ? '' : 'none' }} key='2' onClick={onshow}>
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
                          return <div key={item.name}>  <FileExcelOutlined /> {item.name}    <span className={style.del} onClick={() => dellist(item)}>删除</span></div>
                        })}

                      </div>
                    ) : (
                      <p>没有选择任何文件</p>
                    )}
                  </div>
                </div>
              </Modal>
            </div>

          </div>
        </div>
        <div className={style.butsub}>
          <div className={style.worddetail}>
      {selectedFile.length!=0?
       <>
         已选择文件：{selectedFile[0].name}
       </>:<>没有选择任何文件</>
      }
      </div>
          <AwesomeButton type="primary" onPress={sub}> 确定并上传</AwesomeButton>
        </div>
      </div>

      <div className={style.right}>
        <div className={style.rtit}>
          操作解释
        </div>
        <div className={style.mainr}>
          <Collapse defaultActiveKey={['1']} >
            <Panel header="文本创建数据集" key="1">
              <p className={style.textcon}>{text}</p>

            </Panel>
            <Panel header="文本创建并导入" key="2">
              <p className={style.textcon}>{text1}</p>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  )
}
