import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

function Allxian({maxs}){
  const chartContainer = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartContainer.current);
let option
 if(maxs.length==0){
  console.log('jijijijijij')
  option = {
    title: {
      text: '最高/低模型准确度',
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        // dataZoom: {
        //   yAxisIndex: 'none'
        // },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
       
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['故障零', '故障一', '故障二', '故障三', '故障四', '故障五']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} %'
      },
      max:100,
      min:60,
      interval: 5,
    },
    series: [
      {
        name: '准确率最高模型',
        type: 'line',
        data: [0,
        65,
        90.5,
        92,
        98,
        99],
      },
      {
        name: '准确率最低模型',
        type: 'line',
        data: [80,75,95,93,99,98],
        color:'#56CCF2'
     
      }
    ]
  };
 }else{
  console.log(maxs)
  option = {
    title: {
      text: '最高/低模型准确度',
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        // dataZoom: {
        //   yAxisIndex: 'none'
        // },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
       
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['故障零', '故障一', '故障二', '故障三', '故障四', '故障五']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} %'
      },
      max:100,
      min:40,
      interval: 5,
    },
    series: [
      {
        name: '准确率最高模型',
        type: 'line',
        data: [Number(maxs[0][0][2][0]+maxs[0][0][2][1]),
        Number(maxs[0][1][2][0]+maxs[0][1][2][1]),
        Number(maxs[0][2][2][0]+maxs[0][2][2][1]),
        Number(maxs[0][3][2][0]+maxs[0][3][2][1]),
        Number(maxs[0][4][2][0]+maxs[0][4][2][1]),
        Number(maxs[0][5][2][0]+maxs[0][5][2][1])],
      },
      {
        name: '准确率最低模型',
        type: 'line',
        data: [
          Number(maxs[1][0][2][0]+maxs[1][0][2][1]),
        Number(maxs[1][1][2][0]+maxs[1][1][2][1]),
        Number(maxs[1][2][2][0]+maxs[1][2][2][1]),
        Number(maxs[1][3][2][0]+maxs[1][3][2][1]),
        Number(maxs[1][4][2][0]+maxs[1][4][2][1]),
        Number(maxs[1][5][2][0]+maxs[1][5][2][1])]
          ,
        color:'#56CCF2'
      }
    ]
  };
 }

    myChart.setOption(option);

    // 在组件销毁时，销毁图表实例
    return () => {
      myChart.dispose();
    };
  }, [maxs]);

  return <div ref={chartContainer} style={{ width: '100%', height: '230px' }} />;
};

export default Allxian;