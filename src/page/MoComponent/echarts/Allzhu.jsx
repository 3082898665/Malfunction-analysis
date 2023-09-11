import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Allzhu = () => {
  const chartContainer = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartContainer.current);

 
   const  option = {
    title: {
      text: '最高模型训练和验证模型对比',
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['训练模型', '验证模型']
    },
    toolbox: {
      show: true,
      feature: {

        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
   
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data: [ '故障零', '故障一', '故障二', '故障三', '故障四','故障五']
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value} %'
        },   
         min:50
      },
  
    ],
    series: [
      {
        name: '训练模型',
        type: 'bar',
        data: [
          78, 75,90,95,90,95,90
        ],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
     
      },
      {
        name: '验证模型',
        type: 'bar',
        data: [
         75,88,92,96,98,97
        ],
        markPoint: {
          data: [
            { name: 'Max', value: 98, xAxis: 5, yAxis:98 },
            { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        },
        color:'#56CCF2'
      }
    ]
  };
    myChart.setOption(option);

    // 在组件销毁时，销毁图表实例
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartContainer} style={{ width: '100%', height: '230px' }} />;
};

export default Allzhu;