import React, { useState, useRef, useEffect } from 'react'
import style from '../index.module.css'
import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import { Button, Modal, Select, Input,message } from 'antd';
import { ExclamationCircleOutlined, FileExcelOutlined } from '@ant-design/icons';
import {getdatalist} from '../../../request/api'
import axios from 'axios';

export default function Info({ setdata,Sellist,setshow,seti }) {
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
      messageApi.open({
        type: 'success',
        content: '模型添加成功',
      });
    };
    const [open, setOpen] = useState(false);
    const [wjj, setwjj] = useState([]);
useEffect(()=>{
    getdatalist().then(res=>{
        const data=res.data.data;
        console.log(data)
        let logg=[]
        for(let i=0;i<data.length;i++){
      logg.push({
        value:data[i].id,
        label: data[i].name
      })
        }
        setwjj(logg)
      })
},[])
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const accModal = () => {
        setOpen(false);
        if (selectedFile.length > 0)
            setdata(true)
    };
    const [wjjn,setwjjn]=useState()
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setwjjn(value)
    };
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [selectedFile, setSelectedFile] = useState([]);

    const inputRef = useRef();
    const formData = new FormData();
    const changeHandler = (event) => {
        // 获取文件输入框的值
        console.log(event.target.files[0])
        Sellist((oldData) => [...oldData, event.target.files[0]]);
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

const [wjname,setwjname]=useState(null)
function changew(e){
    setwjname(e.target.value)
    localStorage.setItem('xiu',e.target.value)
}


    return (
        <div className={style.tcontain}>
            {contextHolder}
            <div className={style.Ttitle}>
            添加操作
            </div>
            <div className={style.tmain}>
                <div className={style.tbo}>
                    <div className={style.tname}>选择插入文件夹</div>
                    <div className={style.tin}> <Select
      placeholder="选择文件夹"
      style={{
        width: 220,
      }}
      onChange={handleChange}
      options={wjj}
    /></div>
                </div>
            </div>
            <div className={style.tmain}>
                <div className={style.tbo}>
                    <div className={style.tname}>名称</div>
                    <div className={style.tin}><Input placeholder="Basic usage" value={wjname} onChange={changew}/></div>
                </div>
            </div>
        
            <div className={style.tmain}>
                <div className={style.tbo}>
                    <div className={style.tname}>模型文件选择：</div>
                    <div className={style.tin}>
                        <Button onClick={showModal}>
                            文件上传
                        </Button>
                        <Modal
                            title="添加算法文件"
                            open={open}
                            onOk={accModal}
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
                                                    return <div key={item.name}>  <FileExcelOutlined /> {item.name}    <span className={style.del} onClick={() => dellist(item)}>删除</span></div>
                                                })}

                                            </div>
                                        ) : (
                                            <p>没有选择任何文件</p>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
            <div className={style.tblock}>
                {selectedFile.map((item, index) => {
                    return <div key={item.name}>  <FileExcelOutlined /> {item.name} </div>
                })}
            </div>
            <div className={style.tmain}>
                <div className={style.tbo}>
                    <div >
                        
                        <AwesomeButtonProgress type="primary" onPress={ (element, next) => {
                            // await for something then call

                            const files = [...selectedFile]

                            setIsFilePicked(false)
                            setSelectedFile((oldData) => []);
                        
                            for (let i = 0; i < files.length; i++) {
                              formData.append('file', files[i]);
                              console.log(formData.get('file'))
                            }
                            axios.post('http://192.168.143.188:10010/result/uploadPkl?name='+wjname+'&fileId='+wjjn,formData,{
                                headers:{
                                    'Content-Type': 'multipart/form-data',
                                    'Token':localStorage.getItem('token')
                                  }}).then(res=>{
                                console.log(11111);
                                setshow(true)
                                next();
                                success();
                                seti(true)
                              })

                        }}>添加模型</AwesomeButtonProgress>
                    </div>
                </div>
            </div>
        </div>
    )
}
