import React, { useEffect, useState } from 'react'
import { Button, Steps, theme, Modal, notification } from 'antd';
import { publish } from 'pubsub-js';
import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import style from './train.module.css'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { subscribe } from 'pubsub-js'
import {createwjj,runxl,heightxl} from '../../request/api'
export default function MyTrain() {
    const { state } = useLocation();
    const navigate = useNavigate()
    //对话框
    const [open, setOpen] = useState(false);
      const[getresule,setresult]=useState(false)

    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        publish('changepath', { data: '/contain/mymodule' })
        navigate('/contain/mymodule')
        setOpen(false);
    };
    const outModal = () => {
        setOpen(false);
    };
    //步骤条函数
    const steps = [
        {
            title: 'Step 1',
            subTitle: 'Model preparation',
            status: 'finish',
            description: 'This is a description.',
        },
        {
            title: 'Step 2',
            subTitle: '00:01:02',
            status: 'process',
            description: 'This is a description.',
        },
        {
            title: 'Step 3',
            subTitle: 'waiting for longlong time',
            status: 'wait',
            description: 'This is a description.',
        },
    ]
    //数据框内值编写
    const [passone, setPassone] = useState(false)
    const [passtwo, setPasstwo] = useState(false)
    const [sele,setsele]=useState()
    let id = 0

    const [current, setCurrent] = useState(0);
    
    //判断是否进入第三步
    const [twoleng,setTwo]=useState(0)

    //消息提醒弹框
    useEffect(() => {
        //表示是否直接加入第二步
        if(state){
            if(state.value==1){
                const id=state.id
                const name=state.name
                console.log(name)
                setCurrent(1);
                setPro((pro) => {
                    const arr = pro.splice();
                    arr[0] = 'finish'
                    return arr
                })
                navigate('/contain/train/steptwo',{state:{name:name,id:id}})
            }
        }
        
        subscribe('onechild', (_, data) => {
            if (data.da == -1) {
                setPassone(false)
                
            } else if(data.da==1||data.da==2) {
                setPassone(true)
                setsele(data)
                setonname(data.value)
            }
        })
        subscribe('changelen', (_, data) => {
         setTwo(data)
         if(data>0){
            setCurrent(1)
         }
         console.log(data)
        })
    }, [passone, passtwo])
    const [api, contextHolder] = notification.useNotification();
    const [onename,setonname]=useState()
    const openNotification = () => {
        const placement = 'top'
        api.info({
            message: "注意",
            description:
                '你有未填的值，请填写完整',
            placement,
        });
    };
    const onChange = async (value) => {        //判断第一步骤是否准确
        if (value == 0) {
            navigate('/contain/traint/stepone')
            setCurrent(value);
        }
        //判断第二步骤是否准确 
        else if (value == 1) {
            let sendid
            if (passone == true) {
                console.log(localStorage.getItem('moxid'))
                let ids=sele.sel
                if(sele.da==1){
              const dui={name:onename}
               await createwjj(dui).then(res=>{
                  const data=res.data.data
                  console.log(data)
                 ids=data
                })
                }
                navigate('/contain/train/steptwo',{state:{value:1,id:ids}})
                setCurrent(current + 1);
                setPro((pro) => {
                    const arr = pro.splice();
                    arr[0] = 'finish'
                    return arr
                })
            }
            else {
                openNotification()
            }
        } else if (value == 2) {
            if(twoleng!=0){
                setPro((pro) => {
                    const arr = pro.splice();
                    arr[1] = 'finish'
                    return arr
                })
                const ju=false
                navigate('/contain/traint/stepthird',{state:{ju,data:[1]}})
                setCurrent(current + 1);
            }   else {
                openNotification()
            }
        }
    };


    const next = async () => {
        // 第一步
        if (current == 0) {
            if (passone == true) {
                console.log(localStorage.getItem('moxid'))
                let ids=sele.sel
                if(sele.da==1){
                    const dui={name:onename}
                                  await createwjj(dui).then(res=>{
                                     const data=res.data.data
                                     console.log(data)
                                    ids=data
                                   })
                                   }
               navigate('/contain/traint/steptwo',{state:{value:1,id:ids}})
                setCurrent(current + 1);
                setPro((pro) => {
                    const arr = pro.splice();
                    arr[0] = 'finish'
                    return arr
                })
            }
            else {
                openNotification()
            }

        }//第二步 
        else if (current == 1) {
            if(twoleng!=0){
                setPro((pro) => {
                    const arr = pro.splice();
                    arr[1] = 'finish'
                    return arr
                })
                const ju=false
                navigate('/contain/traint/stepthird',{state:{ju,data:[1]}})
                setCurrent(current + 1);
            }   else {
                openNotification()
            }
         

        }
    };
    const prev = () => {
        setCurrent(current - 1);
        if (current == 2) {
            setPro((pro) => {
                const arr = pro.splice();
                arr[1] = 'wait'
                return arr
            })

            navigate('/contain/traint/steptwo',{state:{value:1,id:localStorage.getItem('selbyid')}})
        } else if (current == 1) {
            setPro((pro) => {
                const arr = pro.splice();
                arr[0] = 'wait'
                return arr
            })
            navigate('/contain/traint/stepone')
        }
        // console.log(current)
    };

    //进行步骤约束
    const [progress, setPro] = useState(['process', 'wait', 'wait'])  //finish||process
    return (
        <div >
            {contextHolder}
            <div className={style.all}>
                <div className={style.step}>
                    <Steps
                        type="navigation"
                        size="small"
                        current={current}
                        onChange={onChange}
                        className="site-navigation-steps"
                        items={[
                            {
                                title: '',
                                subTitle: '模型准备',
                                status: progress[0],
                                description: '创建或选择模型',
                                key: 1
                            },
                            {
                                title: '',
                                subTitle: '训练数据集',
                                status: progress[1],
                                description: '选择合适的模型 ',
                                key: 2
                            },
                            {
                                title: '',
                                subTitle: '模型训练',
                                status: progress[2],
                                description: '检测故障结果',
                                key: 3
                            },
                        ]}
                    />
                </div>
                <div className={style.diver}></div>
                <div className={style.stepchild}>
                    <Outlet />
                </div>
                {/* 按钮 */}
                <div className={style.butfix}>
                    <div className={style.stepbut}>

                        {current < steps.length - 1 && (
                            // <Button type="primary" onClick={() => next()}>
                            //     Next
                            // </Button>
                            <AwesomeButton type="primary" style={{ marginRight: '10px' }} onPress={() => next()}>下一步</AwesomeButton>
                        )}
                        {current === steps.length - 1 && (
                            <>
                                <AwesomeButtonProgress type="primary" onPress={async (element, next) => {
                                    // await for something then call

                                    heightxl(localStorage.getItem('selelist')).then(res=>{
                                       console.log(res.data)
                                            next();
                                            const ju=true
                                            navigate('/contain/train/stepthird',{state:{ju,data:res.data.data}})
                                    })
                                   
                                  
                                }}>开始训练</AwesomeButtonProgress>&nbsp;&nbsp;
                            </>
                        )}
                        {current > 0 && (

                            <AwesomeButton type="secondary" onPress={() => prev()} style={{ marginRight: '10px' }}>上一步</AwesomeButton>
                        )}
                        <AwesomeButton type="secondary" onPress={showModal} >返回</AwesomeButton>
                        <Modal
                            title="确定要取消训练模型任务吗？"
                            open={open}
                            onOk={hideModal}
                            onCancel={outModal}
                            okText="确认"
                            cancelText="取消"
                        >
                            <p>返回将清空刚才填写的数据内容</p>
                            <p>返回将返回我的模型</p>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}
