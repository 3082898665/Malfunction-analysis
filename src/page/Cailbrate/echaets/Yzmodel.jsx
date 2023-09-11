import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const  Yzmodel= ({yzdatas}) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartContainer.current);
let options
if(yzdatas.length==0){
   options = {
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
        // magicType: { show: true, type: ['line', 'bar'] },
      }
    },
    legend: {
      data: ['Evaporation', 'Temperature']
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
        name: '柱状图',
        min: 50,
        max: 100,
        interval: 10,
        axisLabel: {
          formatter: '{value} %'
        }
      },
      {
        type: 'value',
        name: '折线图',
        min: 50,
        max: 100,
        interval: 5,
        axisLabel: {
          formatter: '{value} %'
        }
      }
    ],
    series: [
      {
        name: '柱状图',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml';
          }
        },
        data: [
          70,80,92,95,99,97
        ]
      },

      {
        name: '折线图',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' °C';
          }
        },
        data: [
            70,80,92,95,99,97
        ]
      }
    ]
  };
}else{
  options = {
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
      data: ['折线图', '柱状图']
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
        name: '柱状图',
        min: 40,
        max: 100,
        interval: 10,
        axisLabel: {
          formatter: '{value} %'
        }
      },
      {
        type: 'value',
        name: '折线图',
        min: 40,
        max: 100,
        interval: 5,
        axisLabel: {
          formatter: '{value} %'
        }
      }
    ],
    series: [
      {
        name: '柱状图',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' %';
          }
        },
        data: [
          Number(yzdatas[0][2][0]+yzdatas[0][2][1]),
          Number(yzdatas[1][2][0]+yzdatas[1][2][1]),
          Number(yzdatas[2][2][0]+yzdatas[2][2][1])
          ,Number(yzdatas[3][2][0]+yzdatas[3][2][1])
          ,Number(yzdatas[4][2][0]+yzdatas[4][2][1]),
          Number(yzdatas[5][2][0]+yzdatas[5][2][1])
        ]
      },

      {
        name: '折线图',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + '%';
          }
        },
        data: [
          Number(yzdatas[0][2][0]+yzdatas[0][2][1])
          ,Number(yzdatas[1][2][0]+yzdatas[1][2][1]),
          Number(yzdatas[2][2][0]+yzdatas[2][2][1])
          ,Number(yzdatas[3][2][0]+yzdatas[3][2][1])
          ,Number(yzdatas[4][2][0]+yzdatas[4][2][1]),
          Number(yzdatas[5][2][0]+yzdatas[5][2][1])
        ]
      }
    ]
  };
}
    myChart.setOption(options);

    // 在组件销毁时，销毁图表实例
    return () => {
      myChart.dispose();
    };
  }, [yzdatas]);

  return <div ref={chartContainer} style={{ width: '500px', height: '450px',display:yzdatas.length>0?'':'none' }} />;
};

export default Yzmodel;