import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import './Down.scss'
import style from './index.module.css'
import { CloudDownloadOutlined } from '@ant-design/icons';
import ReactEcharts from 'echarts-for-react';
import Load from './Down'
import { Button, Select, Space, Table, Tag, Spin } from 'antd';
import { useState } from 'react';
import Nodata from '../../assets/nodata.png'
import success from '../../assets/pic/succeed.png'
import { getdatalist, getwjinfo, getxldata, getModelCreator } from '../../request/api'
import { addCount } from '../../request/newspi'
import axios from 'axios';
//下拉数据



export default function PascalCase() {
  const [openyz, setyz] = useState(false)
  const [showmodule, setmodule] = useState(false)
  const [numm, setnumm] = useState([])
  const [wjj, setwjj] = useState([])
  const [load, setload] = useState(false)
  useEffect(() => {
    getdatalist().then(res => {
      const data = res.data.data;
      console.log(data)
      let logg = []
      for (let i = 0; i < data.length; i++) {
        logg.push({
          value: data[i].id,
          label: data[i].name
        })
      }
      setwjj(logg)
    })
  }, [])
  const getOption = () => {
    return {
      title: {
        text: '分类数据'
      },
      tooltip: {},
      legend: {
        data: ['准确率百分比']
      },
      xAxis: {
        data: ["故障零", "故障一", "故障二", '故障三', '故障四', '故障三']
      },
      yAxis: {},
      series: [{
        name: '准确率百分比',
        type: 'line',
        data: [85, 80, 88, 90, 92, 85]
      }]
    };
  }
  const getStyle = () => {
    return {
      width: '70%',
      height: '300px',
      margin: '50px 0px 0px 0px'
    };
  }
  const [type, settype] = useState()
  const [num, setnum] = useState()
  const handleChange = (value) => {
    setyz(true)
    localStorage.setItem('nigw', value)
    console.log(`Selected: ${value}`);
    settype(value)
    getwjinfo(value).then(res => {
      const data = res.data.data;
      let logg = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].done == 3 || data[i].done == 2) {
          logg.push({
            value: data[i].id,
            label: data[i].name
          })
          localStorage.setItem(data[i].id, data[i].name)
        }
      }
      setnumm(logg)
    })
  };
  function push() {
    const hisarr = { modelId: localStorage.getItem(`nigm`), fileId: localStorage.getItem('nigw'), type: '下载模型' }
    addCount().then(res => {

    })
    console.log(hisarr)
    axios.post('http://192.168.182.188:10010/history/save', hisarr, {
      headers: {
        'Content-Type': 'application/json',
        'Token': localStorage.getItem('token'),
      }
    }).then(res => {
      console.log(res.data)

    })
  }

  const [urls, seturls] = useState()
  const [rname, setrname] = useState()
  const [creator, setcreat] = useState('')
  const [sizedata, setsizedata] = useState('')
  const handleChangemodule = (value) => {
    localStorage.setItem('nigm', value)
    setload(true);
    getModelCreator(value).then(res => {
      console.log(res.data.data);
      setcreat(res.data.data)

    })
    seturls(`http://192.168.182.188:10010/result/getPkl?modelId=${value}`)
    console.log(`Selected: ${value}`);
    setmodule(true)
    setrname(localStorage.getItem(value))
    setsizedata(`http://192.168.182.188:10010/result/getJson?modelId=${value}`)

    setnum(value)
  };

  //表格数据
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '下载次数',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>修改名称</a>

        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: rname,
      age: 2,
      address: '',
      tags: ['nice', 'developer'],
    },
  ];

  return (
    <div className={style.three}>
      <div className={style.left}>
        <div className={style.title}>
          <div className={style.sele} m style={{ marginBottom: '-70px' }}>
            文件夹选择&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Select

              defaultValue="文件夹选择"
              onChange={handleChange}
              style={{
                width: 250,
              }}
              options={wjj}
            />
          </div>
          <div className={style.sele} m style={{ marginBottom: '-70px', display: openyz ? '' : 'none' }}  >
            选择下载模型(已完成验证)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Select

              defaultValue="请选择模型"
              onChange={handleChangemodule}
              style={{
                width: 200,
              }}
              options={numm}
            />
          </div>

          {showmodule ? <>
          </> :
            <div className={style.maintit}>
              <div style={{ display: load ? '' : 'none' }}><Spin size='large'></Spin> </div>
              <img src={Nodata} alt='loading' className={style.nodata}></img>
              <div className={style.mainfont}>
                <div className={style.norfont}>
                  请选择模型或暂无可下载模型
                </div>
              </div>
            </div>
          }
          <br />
          <div className={style.sele} m style={{ marginBottom: '70px', position: 'relative', top: '-50px', display: showmodule ? '' : 'none' }}  >
            下载分类结果&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button> <a href={sizedata} download onClick={push}>进行下载</a></Button>
            {/* <Button onClick={xia}> 进行下载</Button> */}
          </div>
        </div>
      </div>
      <div className={style.right} style={{ display: showmodule ? '' : 'none' }}>
        <div className={style.decrise}>
          <div className={style.decl}>
            <div className={style.gzdec}>
              属性数据展示:
              <div className={style.label}>
                <Table columns={columns} dataSource={data} />
              </div>
            </div>

          </div>
          <div className={style.decr} >
            <div className={style.dload}>
              <a href={urls} download style={{ marginRight: '5px' }} onClick={push}>进行模型下载</a>
              <CloudDownloadOutlined />
            </div>
          </div>
        </div>
        <div className={style.titright}>
          <div className={style.trtl}>

          </div>
          <div className={style.trtr}></div>
        </div>
        <div className={style.tu}>
          <div className={style.App}>
            <ReactEcharts option={getOption()} style={getStyle()} />
          </div>
          <div className={style.threemodule}>
            <div className={style.finaldata}> 最终准确率:{Number(creator[0] + creator[1])}% <img src={success} className={style.status}></img>
            </div>
            <Canvas
              shadows
              camera={{
                near: 0.5,
                far: 50,
                fov: 70,
                // position:[0,0,0]
              }}

            >
              <color args={['rgb(255,255,255)']} attach={'background'} />
              <Load />
            </Canvas>

          </div>
        </div>

      </div>


    </div>
  )
}
