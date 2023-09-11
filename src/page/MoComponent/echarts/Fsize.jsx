import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

export default function Fsize({arr}){
  const chartContainer = useRef(null);
 
  useEffect( () => {
console.log(arr)
 let newarr=[]
 for(let i=0;i<6;i++){
  newarr[i]=Number(arr[i][2][0]+arr[i][2][1])
  console.log(newarr[i])
 }


    const myChart = echarts.init(chartContainer.current);

 
  const option = {
 
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%'
    },
    legend: {
      data: ['故障零', '故障一', '故障二', '故障三', '故障四','故障五']
    },
    series: [
     
      {
        name: 'Actual',
        type: 'funnel',
        left: '10%',
        width: '80%',
        maxSize: '80%',
        color: ['#0052D4', '#0051d497', '#0051d45c', '#0051d421', '#155cce14', '#155cce0f'],

        label: {
          position: 'inside',
          formatter: '{c}%',
         color: '#000000' // 修改为黑色
        },
        itemStyle: {
          opacity: 0.8,
          borderColor: '#fff',
          borderWidth: 2,
         
        },
        emphasis: {
          label: {
            position: 'inside',
            formatter: '{b}Actual: {c}%'
          }
        },
        data: [
            { value:newarr[4], name: '故障四' },
            { value:newarr[5], name: '故障五' },
          { value: newarr[0], name: '故障零' },
          { value: newarr[3], name: '故障三' },
          { value: newarr[1], name: '故障一' },
          { value: newarr[2], name: '故障二' },
          
       
        ],
        // Ensure outer shape will not be over inner shape when hover.
        z: 100
      }
    ]
  };
    myChart.setOption(option);

    // 在组件销毁时，销毁图表实例
    return () => {
      myChart.dispose();
    };
  }, [arr]);

  return <div ref={chartContainer} style={{  height:'60%',marginLeft:'-3%' }} />;
};

;