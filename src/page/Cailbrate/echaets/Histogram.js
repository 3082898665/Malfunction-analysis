import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Histogram = ({data}) => {
  const chartContainer = useRef(null);
  useEffect(() => {
    const myChart = echarts.init(chartContainer.current);
    let options 
   console.log(data)
if(data.length>1){
options= {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} %'
    }
  },
  yAxis: {
    type: 'category',
    data: ['故障0', '故障1', '故障2', '故障3', '故障4','故障5'],
    
  },
  series: [
    {
      type: 'bar',
      data: [
        { value: Number(data[0][2][0]+data[0][2][1]), name: '故障0',itemStyle: {
            color: '#a90000'
          } },
        { value:Number(data[1][2][0]+data[0][2][1]),name: '故障1' },
        { value:Number(data[2][2][0]+data[2][2][1]), name: '故障2' },
        { value:Number(data[3][2][0]+data[3][2][1]), name: '故障3' },
        { value:Number(data[4][2][0]+data[5][2][1]), name: '故障4' },
        { value:Number(data[5][2][0]+data[5][2][1]), name: '故障5' }
      ],
      barWidth: '50%',
      label: {
        show: true,
        position: 'insideRight',
      },
    },
  ],
};
}else{
  alert(1111)
  options= {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: ['故障0', '故障1', '故障2', '故障3', '故障4','故障5'],
    },
    series: [
      {
        type: 'bar',
        data: [
          { value: 0.82, name: '故障0',itemStyle: {
              color: '#a90000'
            } },
          { value:0.89,name: '故障1' },
          { value:0.89, name: '故障2' },
          { value:0.94, name: '故障3' },
          { value:0.91, name: '故障4' },
          { value:0.96, name: '故障5' }
        ],
        barWidth: '50%',
        label: {
          show: true,
          position: 'insideRight',
        },
      },
    ],
  };
}
    

    myChart.setOption(options);

    // 在组件销毁时，销毁图表实例
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartContainer} style={{ width: '25rem', height: '300px' }} />;
};

export default Histogram;