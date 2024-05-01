import React, { useState, useRef, useEffect } from 'react'
import style from '../index.module.css'
import { Button, Modal, Select } from 'antd'
import Myecharts from './Myecharts'
import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import { ExclamationCircleOutlined, FileExcelOutlined } from '@ant-design/icons';
import axios from 'axios';
import { heightyz, getWide } from '../../../request/api'
const options = [
    { size: 0, p: 0.64, r: 0.81, f1: 0.71, s: 176 },
    { size: 1, p: 0.61, r: 0.84, f1: 0.71, s: 166 },
    { size: 2, p: 0.73, r: 0.45, f1: 0.56, s: 171 },
    { size: 3, p: 1.0, r: 0.88, f1: 0.94, s: 169 },
    { size: 4, p: 0.97, r: 0.85, f1: 0.91, s: 156 },
    { size: 5, p: 0.99, r: 0.92, f1: 0.94, s: 162 },
]
export default function Dataget({ mylist, show, initr }) {
    const [open, setOpen] = useState(false);
    const [yzid, setyzid] = useState();
    const [echdata, setechdata] = useState([]);
    const [echartshow, setechshow] = useState(false)
    const handleChange = (value) => {
        setyzid(value)
    };
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const accModal = () => {
        setOpen(false);

    };
    const [option, setoption] = useState([])
    useEffect(() => {
        setoption([])
        getWide().then(res => {
            console.log(res.data);
            const data = res.data.data;
            for (let i = 0; i < data.length; i++) {
                setoption(old => {
                    return [...old, {
                        value: data[i].id,
                        label: data[i].name
                    }]
                })
            }
        })
    }, [initr])
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [selectedFile, setSelectedFile] = useState([]);
    const [showmodel, setmodel] = useState(false)
    const inputRef = useRef();
    const [showbut, setsbut] = useState(true);
    const [yzdata, setyzdata] = useState([])
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
    const [wjname, setwjname] = useState(null)
    function changew(e) {
        setwjname(e.target.value)
        localStorage.setItem('xiu', e.target.value)
    }



    const [datashow, setdatashow] = useState(false)
    return (
        <div className={style.dcontain} >
            <div className={style.Ttitle}>
                模型验证
            </div>
            <div className={style.tmain}>
                <div className={style.tbo}>
                    <div className={style.tname}>添加模型选择</div>
                    <div className={style.tin}>
                        <Select
                            defaultValue="选择模型"
                            style={{
                                width: 160,
                            }}
                            onChange={handleChange}
                            options={option}
                        />
                        {mylist.map((item, index) => {
                            return <div key={item.name}>  {item.name}  </div>
                        })}
                    </div>
                </div>
            </div>

            <div className={style.tmain}>
                <div className={style.tbo}>
                    <div className={style.tname}>验证集选择：</div>
                    <div className={style.tin}>
                        <Button onClick={showModal} style={{ zIndex: '1000' }}>
                            文件上传
                        </Button>
                        <Modal
                            title="添加验证集"
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
            <div className={style.echpic} style={{ display: echartshow ? '' : 'none' }}>
                <Myecharts datas={echdata} />
            </div>
            {/* <div className={style.tblock}></div> */}
            <div className={style.ttmain} style={{ display: showbut ? '' : 'none' }}>
                <div className={style.tbo} >
                    <div className={style.tbut}>
                        <AwesomeButtonProgress type="primary" onPress={async (element, next) => {

                            const files = [...selectedFile]

                            setIsFilePicked(false)
                            setSelectedFile((oldData) => []);

                            for (let i = 0; i < files.length; i++) {
                                formData.append('file', files[i]);
                                console.log(formData.get('file'))
                            }

                            axios.post('http://192.168.182.188:10010/result/upload', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    'Token': localStorage.getItem('token')
                                }
                            }).then(res => {

                                heightyz([yzid, 2]).then(resd => {
                                    console.log(resd.data.data);
                                    setechdata(resd.data.data.results);
                                    setechshow(true)
                                    setsbut(false)
                                    next();
                                })

                            })
                        }}>开始验证</AwesomeButtonProgress>
                    </div>
                </div>
            </div>
        </div>
    )
}
