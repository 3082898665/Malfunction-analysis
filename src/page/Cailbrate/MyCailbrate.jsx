import React, { useEffect, useState } from 'react'
import style from './index.module.css'
import { Select, Radio, Badge, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import DeTailwinder from './winder/DeTailwinder';
import Yzwinder from './winder/Yzwinder';
import Mytrain from './Mytrain'
import Myimg from './Myimg';
import Echarts from './Echarts';
import Nodata from '../../assets/pic/nodata.png'
import Yzmodel from './echaets/Yzmodel';
import Yzmodel2 from './echaets/Yzmodel2'
import axios from 'axios';
import { getdatalist, getwjinfo, runxl, heightxl, getxldata } from '../../request/api'
const options = [];
const optiontype = [
  { value: 1, label: '柱状图' },
  { value: 2, label: '扇形图' },
  { value: 3, label: '柱状图3D' }
]
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

export default function MyCailbrate() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const [Cab, setCab] = useState([])
  const [show, setShow] = useState(false)
  const [showtow, setshowtow] = useState(false)
  const [type, settype] = useState(1);
  const [yzopen, setyzopen] = useState(false)
  const [load, setload] = useState(false)
  const [pic, setpic] = useState(false)
  const [wjj, setwjj] = useState([])
  const [module, setmodule] = useState([])
  const [realdata, setrealdata] = useState([])
  useEffect(() => {
    getdatalist().then(res => {
      const data = res.data.data;
      let logg = []
      for (let i = 0; i < data.length; i++) {
        logg.push({
          value: data[i].id,
          label: data[i].name
        })
        if (data[i].name == '随机森林文件夹') {

          localStorage.setItem(data[i].id, 1)
        } else {
          localStorage.setItem(data[i].id, 0)
        }
      }
      setwjj(logg)
    })
  }, [])
  const [yzloading, setyzload] = useState(false)
  const handleChange = (value) => {
    localStorage.setItem('maintype', localStorage.getItem(value))
    localStorage.setItem('nigw', value)
    getwjinfo(value).then(res => {
      const data = res.data.data;
      let logg = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].done == 2) {
          logg.push({
            value: data[i].id,
            label: data[i].name
          })
        }
      }
      setmodule(logg)
    })

    setShow(true)
  };
  const [yzmodule, setyz] = useState()
  const handleChangetow = (value) => {
    localStorage.setItem('nigm', value)
    setshowtow(true)
    setload(true)
    setyz(value)
    const newvalue = [value, 0]
    getxldata(newvalue).then(res => {
      console.log(res.data.data);
      setload(false)
      setpic(true)
      const data = res.data.data
      setrealdata(data)
      console.log(data)
      const hisarr = { modelId: localStorage.getItem(`nigm`), fileId: localStorage.getItem('nigw'), type: '查看模型' }
      console.log(hisarr)
      axios.post('http://192.168.182.188:10010/history/save', hisarr, {
        headers: {
          'Content-Type': 'application/json',
          'Token': localStorage.getItem('token'),
        }
      }).then(res => {
        console.log(res.data)

      })
    })
  };

  const Changetype = (value) => {
    console.log(`Selected: ${value}`);
    settype(value)
  };
  return (
    <div className={style.all}>

      <div className={style.top}>
        <span>
          选择文件夹&nbsp;&nbsp;&nbsp;
          <Select
            placeholder='请选择'
            onChange={handleChange}
            style={{
              width: 200,
            }}
            options={wjj}
            key={1}
          />
        </span>&nbsp;&nbsp;&nbsp;

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span style={{ display: show == true ? 'block' : 'none' }}>
          选择模型(未验证)&nbsp;&nbsp;&nbsp;&nbsp;
          <Select
            key={2}
            onChange={handleChangetow}
            style={{
              width: 200,
            }}
            options={module}
          />
        </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span className={style.radio} style={{ display: pic == true ? '' : 'none' }}>
          模型算法:&nbsp;&nbsp;&nbsp;&nbsp;

          <Radio checked>{localStorage.getItem('maintype') == 1 ? '随机森林' : 'Xgboost'}</Radio>
        </span>
        <span className={style.selecttype}>
          <Select
            placeholder='展示类型选择'
            onChange={Changetype}
            style={{
              width: 150,
              zIndex: '10000'
            }}
            options={optiontype}
            key={3}
          />
        </span>
      </div>
      <div className={style.topcon}>
        <div className={style.toptit}>

          <br /><br />
          <span style={{ display: showtow == true ? 'block' : 'none' }}>
          </span>
          <div style={{ display: load == true ? '' : 'none', marginTop: '10vh', marginLeft: '35vw' }}><Spin size="large" /></div>
          <div className={style.xydata} style={{ display: !showtow == true ? 'block' : 'none' }}>

            <img src={Nodata} className={style.datano}></img>
          </div>
        </div>
        <div className={style.train} >
          <div className={style.ttit}>
            训练集准确率:
          </div>
          <div className={style.winder} style={{ display: pic == true ? '' : 'none' }}>
            <DeTailwinder data={realdata} />
          </div>
          <Mytrain openshow={pic} datas={realdata} />
          <div className={style.showimg}>
            <Myimg typeof1={type} openshow={pic} data={realdata} />
          </div>

        </div>
      </div>
      <div className={style.diver}></div>
      <div className={style.bottom}>

        <div className={style.tabdata}>
          <div className={style.create}>
            <Yzwinder setyzopens={setyzopen} openshow={pic} myid={yzmodule} setyzdm={setCab} setyzloading={setyzload}></Yzwinder>

          </div>
          <div className={style.toptit} style={{ marginTop: '20px', marginLeft: '-0px' }}>
            &nbsp;&nbsp;&nbsp; 验证完数据:
          </div>
          {/* */}

          <div className={style.xydata} style={{ display: !yzopen == true ? ' ' : 'none' }}>

            <img src={Nodata} className={style.datano}></img>
          </div>
          <div style={{ display: yzloading == true ? '' : 'none', marginTop: '10vh', marginLeft: '35vw' }}><Spin indicator={antIcon} size='large' /></div>
          {
            Cab.length > 1 && (
              <span style={{ display: yzopen == true ? ' ' : 'none' }}>Macro_F1:{Cab[6][0]}<br /></span>
            )
          }

          {Cab.length > 1 && (
            <div className={style.datatab} >
              {/* success | processing | default | error | warning */}
              <div className={style.tabhei}>故障零 :&nbsp;&thinsp;<Badge status='success' text='finish' />&nbsp;&nbsp;{Cab[0][2]}</div>
              <div className={style.tabhei}>故障一 :&nbsp;&thinsp;<Badge status='success' text='finish' /> &nbsp;&nbsp;{Cab[1][2]}</div>
              <div className={style.tabhei}>故障二 :&nbsp;&thinsp;<Badge status='success' text='finish' />&nbsp;&nbsp;{Cab[2][2]}</div>
              <div className={style.tabhei}>故障三 :&nbsp;&thinsp;<Badge status='success' text='finish' />&nbsp;&nbsp;{Cab[3][2]}</div>
              <div className={style.tabhei}>故障四 :&nbsp;&thinsp;<Badge status='success' text='finish' />&nbsp;&nbsp;{Cab[4][2]}</div>
              <div className={style.tabhei}>故障五 :&nbsp;&thinsp;<Badge status='success' text='finish' />&nbsp;&nbsp;{Cab[5][2]}</div>

            </div>
          )}




          <div className={style.echart} style={{ display: Cab.length > 1 ? '' : 'none' }}>
            <Echarts data={realdata} yzdatas={Cab} />
          </div>
          <div className={style.echart1} style={{ display: Cab.length > 1 ? '' : 'none' }}>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '600' }}>
                验证集模型数据
              </div>
              <Yzmodel yzdatas={Cab} />
            </div>
            <div style={{ marginLeft: '10%' }}>
              <div style={{ fontSize: '17px', fontWeight: '600' }}>
                训练集和验证集模型分类数据
              </div>
              <Yzmodel2 data={Cab} />
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
