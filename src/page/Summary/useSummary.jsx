import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fadeInLeft } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import deal from '../../assets/pic/icon-rgb_指标数据处理-39.png'
import train from '../../assets/pic/-_模型训练.png'
import check from '../../assets/pic/仪器校验流程.png'
import load from '../../assets/pic/下载数据.png'
import { RightOutlined, LineChartOutlined, DashboardOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import style from './index.module.css'
import { getModelCount } from '../../request/api'
import { getCount } from '../../request/newspi'
export default function useSummary() {
  useEffect(() => {
    if (localStorage.getItem('logint') == 0) {
      success()
      localStorage.setItem('logint', 1)
    }
    getModelCount().then(res => {
      console.log(res.data.data)
      let data = res.data.data;
      setall(data.start)
      setfin(data.end)
    })
    axios.get('http://192.168.143.188:10010/result/getModelDone',{headers: {
      'Token': localStorage.getItem('token'),
    }}).then(res=>{
      console.log(res.data.data)
    setdown(res.data.data)
    })
    getCount().then(res=>{
      console.log(res.data.data)
      setdo(res.data.data)
    })
  }, [])
  const [messageApi, contextHolder] = message.useMessage();
  const [all, setall] = useState()
  const [fin, setfin] = useState()
  const [down, setdown] = useState()
  const [done,setdo]=useState()
  const success = () => {
    messageApi.open({
      type: 'success',
      content: '登录成功',
      duration: 10,
    });
  };

  const navigate = useNavigate()
  const styles = StyleSheet.create({
    fadeInLeft: {
      animationName: fadeInLeft,
      animationDuration: '1s'
    }
  })
  const styles1 = StyleSheet.create({
    fadeInLeft: {
      animationName: fadeInLeft,
      animationDuration: '1.25s'
    }
  })
  const styles2 = StyleSheet.create({
    fadeInLeft: {
      animationName: fadeInLeft,
      animationDuration: '1.5s'
    }
  })
  const styles3 = StyleSheet.create({
    fadeInLeft: {
      animationName: fadeInLeft,
      animationDuration: '2s'
    }
  })
  function jump() {
    navigate('/contain/mymodule')
  }
  return (
    <div>
      {contextHolder}
      <div className={style.summary}>
        <h3 className={style.sumtit}>欢迎使用闪闪机器故障诊断系统</h3>
        <p style={{ textAlign: 'left' }} className={style.sumintr}>闪闪故障诊断系统是一个面向企业和个人开发者的零门槛AI开发平台，为零算法基础的开发者提供定制高精度AI模型的服务，包括数据处理、模型训练、服务管理、模型部署功能模块。</p>
        <Button type="primary" className={style.but} onClick={jump}>
          创建模型
        </Button>
        <div className={style.distance}>
          <div className={css(styles.fadeInLeft)}>
            <div className={style.box}>
              <img src={deal} alt="" className={style.imgpic} style={{ width: '60px', marginTop: '3px', marginBottom: '9px' }} />
              <div className={style.title}>数据处理</div>
              <div className={style.describe}>提供闭环的数据管理功能，从数据上传、标注到训练</div>
            </div>
            <div className={style.next}>
              {<RightOutlined />}
            </div>
          </div>
          <div className={css(styles1.fadeInLeft)}>
            <div className={style.box}>
              <img src={train} alt="" className={style.imgpic} style={{ width: '70px', marginTop: '3px', marginBottom: '1px' }} />
              <div className={style.title}>训练模型
              </div>
              <div className={style.describe}>提供丰富的训练方式，零代码轻松获得高精度模型</div>
            </div>
            <div className={style.next}>
              {<RightOutlined />}
            </div>
          </div>
          <div className={css(styles2.fadeInLeft)}>
            <div className={style.box}>
              <img src={check} alt="" className={style.imgpic} style={{ width: '70px', marginTop: '3px', marginBottom: '8px' }} />
              <div className={style.title}>校验模型</div>
              <div className={style.describe}>提供详细的模型评估报告，支持在线校验，助力针对性优化模型</div>
            </div>
            <div className={style.next}>
              {<RightOutlined />}
            </div>
          </div>
          <div className={css(styles3.fadeInLeft)}>
            <div className={style.box}>
              <img src={load} alt="" className={style.imgpic} style={{ width: '100px', marginTop: '-1px', marginBottom: '-12px' }} />
              <div className={style.title}>下载模型</div>
              <div className={style.describe}>将模型转换为适合业务场景的推理形式，从云到端全覆盖</div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.mypro}>
        <div className={style.mytit}>我的数据</div>
        <div className={style.mycontain}>
          <div className={style.cardcon}>
            <div className={style.diver}></div>
            <div className={style.cardbox}>
              <div className={style.header}>
                <span className={style.headertit}>

                  <span className={style.conlogo}><LineChartOutlined /></span> 数据集合

                </span> <span className={style.lqx}>{<RightOutlined />}</span>
              </div>
              <div className={style.boxcontain}>
                <div className={style.single}>
                  <div className={style.fontnum}>{all}</div>
                  数据量 </div>
                <div className={style.curr}>
                  <div className={style.fontnum1}>{fin}/{all}</div>
                  正在运行数据集</div>
              </div>
            </div>
          </div>
          <div className={style.cardcon}>
            <div className={style.diver1}></div>
            <div className={style.cardbox}>
              <div className={style.header}>

                <span className={style.headertit}>

                  <span className={style.conlogo}> <DashboardOutlined /> </span>   验证模型

                </span>
                <span className={style.lqx}>{<RightOutlined />}</span>
              </div>
              <div className={style.boxcontain}>
                <div className={style.single}>
                  <div className={style.fontnum}>{down}</div>
                  数据量 </div>
                <div className={style.curr}>
                  <div className={style.fontnum1} style={{ marginLeft: '15px' }}>{down}/{all}</div>
                  已验证完成量</div>
              </div>
            </div>
          </div>
          <div className={style.cardcon}>
            <div className={style.diver2}></div>
            <div className={style.cardbox}>
              <div className={style.header}>
                <span className={style.headertit}>

                  <span className={style.conlogo}> <CloudDownloadOutlined /></span>    下载管理

                </span>

                <span className={style.lqx}>{<RightOutlined />}</span>
              </div>
              <div className={style.boxcontain}>
                <div className={style.single}>
                  <div className={style.fontnum}>{done}</div>
                  已有模型 </div>
                <div className={style.curr}>
                  <div className={style.fontnum1} style={{ marginLeft: '7px' }}>{done}/{all}</div>
                  已下载模型</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
