import React, { useEffect, useState } from 'react'
import style from './allmodel.module.css'
import { Progress, Select } from 'antd';
import Allxian from '../echarts/Allxian'
import Allzhu from '../echarts/Allzhu'
import Fsize from '../echarts/Fsize';
import First from '../../../assets/pic/gold.png'
import Second from '../../../assets/pic/sec.png'
import Third from '../../../assets/pic/oldt.png'
import { getModelCount, getModelFinish, getModelPercent, getmaxn, getxldata, getOrderModel } from '../../../request/api'
export default function Allmodel() {
  const [maxmin, setmaxn] = useState([])
  const [rank, setrank] = useState([])

  useEffect(() => {
    init();
    getOrderModel().then(res => {
      console.log(res.data.data);
      const data = res.data.data;
      setrank(data)
    })
  }, [])
  function init() {
    getModelCount().then(res => {
      console.log(res.data.data)
      let data = res.data.data;
      setall(data.start)
      setfin(data.end)
    })
    getModelPercent().then(res => {
      console.log(res.data.data)
      const data = res.data.data;
      setxl(data.percent1)
      setyz(data.percent2)
      console.log(Number(data.percent1[0] + data.percent1[1]))
    })
    getModelFinish().then(res => {

      const data = res.data.data
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        let test = {
          value: data[i].id,
          label: data[i].name
        }
        setoption(old => {
          return [...old, test]
        })

        getxldata([data[0].id, 1]).then(res => {
          const data = res.data.data
          console.log(data);

          setarray(data)
        })
      }

    })

    getmaxn().then(res => {
      console.log(res.data.data)
      setmaxn(res.data.data)

    })
  }
  const [array, setarray] = useState([])
  const [option, setoption] = useState([])
  const onChange = (value) => {
    console.log(value)

    getxldata([value, 1]).then(res => {
      const data = res.data.data
      console.log(data);

      setarray(data)
    })
    console.log(`selected ${value}`);

  };
  const onSearch = (value) => {
    console.log('search:', value);

  };

  const [allmodel, setall] = useState();
  const [finiash, setfin] = useState()
  const [xl, setxl] = useState([])
  const [yz, setyz] = useState([])


  return (
    <div className={style.all}>
      <div className={style.left}>
        <div className={style.first}>
          <div className={style.title}>
            总创建模型数
          </div>
          <div className={style.contain}>
            <span className={style.num}> {allmodel}</span>  <span className={style.used}>已训练模型数：{finiash}</span>
            <div style={{ margin: '1rem', marginTop: '-0px' }}>
              <Progress
                percent={Math.floor(finiash * 100 / allmodel)}
                status="active"
                strokeColor={{
                  from: '#FFFFFF',
                  to: '#2980B9',
                }} />
            </div>

          </div>
        </div>
        <div className={style.first}>
          <div className={style.title}>
            训练集最高准确率
          </div>
          <div className={style.contain}>
            <span className={style.num}>{xl}</span>
            {/* <div className={style.usedd}>高于第二模型：2%</div> */}
            {
              xl.length > 1 && (
                <div className={style.cir}>
                  <Progress
                    type="circle"
                    status="active"
                    percent={Number(xl[0] + xl[1])}
                    size={83}
                    strokeColor={{
                      '0%': '#FFFFFF',
                      '100%': '#2980B9',

                    }}
                  />

                </div>
              )
            }


          </div>
        </div>
        <div className={style.first}>
          <div className={style.title}>
            验证集最高准确率
          </div>
          <div className={style.contain}>
            <span className={style.num}>{yz}</span>

            {
              yz.length > 1 && (

                <div className={style.cir}>
                  <Progress
                    type="circle"
                    status="active"
                    percent={Number(yz[0] + yz[1])}
                    size={83}
                    strokeColor={{
                      '0%': '#FFFFFF',
                      '100%': '#2980B9',

                    }}
                  />

                </div>
              )
            }

          </div>
        </div>
        <div className={style.xian}>
          <Allxian maxs={maxmin} />
        </div>
        <div className={style.xian1}>
          <Allzhu />
        </div>
      </div>
      <div className={style.right}>
        <div className={style.title}>


          故障类型分析  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {
            option.length >= 1 && (
              <div className={style.nosel}>
                 <Select
                showSearch
                // placeholder="选择模型"
                optionFilterProp="children"
                defaultValue={option.length >= 1 ? option[0].value : ''}
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={option}
                style={{ marginLeft: '40%', width: '170px', position: 'relative', marginTop: '-200px',zIndex:'1000' }}
              ></Select>
              </div>
             
            )
          }

        </div>
        {

          array.length >= 1 && (
            <Fsize arr={array} />
          )
        }

        <div className={style.diver}></div>
        {rank.length > 0 && (
          <div className={style.rank} >
            <div className={style.title}>
              综合准确度排名
            </div>
            <div className={style.rpart}>
              <img src={First} alt='null' className={style.pic}></img>
              <div className={style.sname}>{rank[0].name}</div>
              <div className={style.sname}>{rank[0].creator1}</div>
            </div>
            <div className={style.rpart}>
              <img src={Second} alt='null' className={style.pic}></img>
              <div className={style.sname}>{rank[1].name}</div>
              <div className={style.sname}>{rank[1].creator1}</div>
            </div>
            <div className={style.rpart}>
              <img src={Third} alt='null' className={style.pic}></img>
              <div className={style.sname}>{rank[2].name}</div>
              <div className={style.sname}>{rank[2].creator1}</div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
