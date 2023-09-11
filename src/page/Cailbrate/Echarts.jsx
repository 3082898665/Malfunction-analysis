import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import style from './detail.module.css'
const Histogram = ({data,yzdatas}) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartContainer.current);
    let option
if(yzdatas.length==0){
  option = {
    title: {
      text: '训练和验证分类准确率',
    },
    legend: {},
    tooltip: {},
    dataset: {
      dimensions: ['product', '训练集准确率', '验证集准确率'],
      source: [
        { product: '故障零', 训练集准确率: 96, 验证集准确率: 96 },
        { product: '故障一', 训练集准确率: 82, 验证集准确率: 85},
        { product: '故障二', 训练集准确率: 89, 验证集准确率: 80 },
        { product: '故障三', 训练集准确率: 89, 验证集准确率: 80 },
        { product: '故障四', 训练集准确率: 94, 验证集准确率: 80 },
        { product: '故障五', 训练集准确率: 91, 验证集准确率: 96 },
       
      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar', }, { type: 'bar' }]
    // 250,200,88
  };
}else{
  option = {
    title: {
      text: '训练和验证分类准确率',
     
    },
    legend: {},
    tooltip: {},
    dataset: {
      dimensions: ['product', '训练集准确率', '验证集准确率'],
      source: [
        { product: '故障零', 训练集准确率: Number(data[0][2][0]+data[0][2][1]), 验证集准确率: Number(yzdatas[0][2][0]+yzdatas[0][2][1]) },
        { product: '故障一', 训练集准确率: Number(data[1][2][0]+data[0][2][1]), 验证集准确率: Number(yzdatas[1][2][0]+yzdatas[1][2][1])},
        { product: '故障二', 训练集准确率: Number(data[2][2][0]+data[2][2][1]), 验证集准确率: Number(yzdatas[2][2][0]+yzdatas[2][2][1]) },
        { product: '故障三', 训练集准确率: Number(data[3][2][0]+data[3][2][1]), 验证集准确率: Number(yzdatas[3][2][0]+yzdatas[3][2][1]) },
        { product: '故障四', 训练集准确率: Number(data[4][2][0]+data[5][2][1]), 验证集准确率: Number(yzdatas[4][2][0]+yzdatas[4][2][1]) },
        { product: '故障五', 训练集准确率: Number(data[5][2][0]+data[5][2][1]), 验证集准确率: Number(yzdatas[5][2][0]+yzdatas[5][2][1])},
       
      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar', }, { type: 'bar' }]
    // 250,200,88
  };
}
   

    myChart.setOption(option);

    // 在组件销毁时，销毁图表实例
    return () => {
      myChart.dispose();
    };
  }, [data,yzdatas]);

  return <div ref={chartContainer} style={{ width: '60rem', height: '330px',display:yzdatas.length>0?'':'none' }} className={style.detail} />;
};

export default Histogram;