import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
const FanHistogram = ({data}) => {
  const chartContainer = useRef(null);
  useEffect(() => {
    const myChart = echarts.init(chartContainer.current);
    let option
if(data.length>1){
option={
  legend: {
    orient: 'vertical', // 调整为垂直方向
    left: -10, // 左边距离调整为10
    top: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}%', // 显示标签名称和值
  },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [10,'80%'],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 2
        },
        data: [
          { value:Number(data[0][2][0]+data[0][2][1]), name: '故障 0' },
          { value:Number(data[1][2][0]+data[0][2][1]), name: '故障 1' },
          { value: Number(data[2][2][0]+data[2][2][1]), name: '故障 2' },
          { value: Number(data[3][2][0]+data[3][2][1]), name: '故障 3' },
          { value: Number(data[4][2][0]+data[5][2][1]), name: '故障 4' },
          { value:Number(data[5][2][0]+data[5][2][1]), name: '故障 5' },

        ]
      }
    ]
  };
}else{
option={
  legend: {
    orient: 'vertical', // 调整为垂直方向
    left: -10, // 左边距离调整为10
    top: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}', // 显示标签名称和值
  },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [10,'80%'],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 2
        },
        data: [
          { value:0.72, name: '故障 1' },
          { value: 0.71, name: '故障 2' },
          { value: 0.56, name: '故障 3' },
          { value: 0.94, name: '故障 4' },
          { value: 0.91, name: '故障 5' },
          { value: 0.96, name: '故障 6' },

        ]
      }
    ]
  };
}
   

    myChart.setOption(option);

    // 在组件销毁时，销毁图表实例
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartContainer} style={{width:'150%', height:'230px',marginTop:'3rem'}} />;
};

export default FanHistogram;