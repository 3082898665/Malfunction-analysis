import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Myshowpage = ({xl,yz}) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartContainer.current);
    let option =[]
    if(xl.length>0&&yz.length>0){
      option= {
        title: {
          text: '训练集和验证集对比',
        },
        tooltip: {
         
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
          }
        },
        legend: {
          data: ['训练集', '验证集', 'Temperature']
        },
        xAxis: [
          {
            type: 'category',
            data: ['故障零', '故障一', '故障二', '故障三', '故障四', '故障五'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '准确率',
            min: 0,
            max: 100,
            interval: 50,
            axisLabel: {
              formatter: '{value} %'
            },
           
          },
        ],
        series: [
          {
            name: '训练集',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + '%';
              }
            },
            data: [
              Number(xl[0][2][0]+xl[0][2][1]), 
              Number(xl[1][2][0]+xl[1][2][1]),
              Number(xl[2][2][0]+xl[2][2][1]),
              Number(xl[3][2][0]+xl[3][2][1]), 
              Number(xl[4][2][0]+xl[4][2][1]),
              Number(xl[5][2][0]+xl[5][2][1])
            ]
          },
          {
            name: '验证集',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %';
              }
            },
            data: [
              Number(yz[0][2][0]+yz[0][2][1]), 
              Number(yz[1][2][0]+yz[1][2][1]),
              Number(yz[2][2][0]+yz[2][2][1]),
              Number(yz[3][2][0]+yz[3][2][1]), 
              Number(yz[4][2][0]+yz[4][2][1]),
              Number(yz[5][2][0]+yz[5][2][1]),

            ],
            color:'#56CCF2'
          },

        ]
      };
    }else{
     option= {
        title: {
          text: '训练集和验证集对比',
        },
        tooltip: {
         
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
          }
        },
        legend: {
          data: ['训练集', '验证集', 'Temperature']
        },
        xAxis: [
          {
            type: 'category',
            data: ['故障零', '故障一', '故障二', '故障三', '故障四', '故障五'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '准确率',
            min: 0,
            max: 100,
            interval: 50,
            axisLabel: {
              formatter: '{value} %'
            },
           
          },
          {
            type: 'value',
            name: '比例',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value} '
            },
            
          }
        ],
        series: [
          {
            name: '训练集',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              }
            },
            data: [
              65, 70, 72, 88, 95,98,
            ]
          },
          {
            name: '验证集',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              }
            },
            data: [
            70,70,75,89,99,98
            ],
            color:'#56CCF2'
          },
        ]
      };
    }

    myChart.setOption(option);
  
    // 在组件销毁时，销毁图表实例
    return () => {
      myChart.dispose();
    };
   
  }, [xl,yz]);

  return <div ref={chartContainer} style={{ width: '100%', height: '230px',marginTop:'20px',marginLeft:'12px' }} />;
};

export default Myshowpage;