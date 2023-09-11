import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/dataZoom';

function Myehcarts({datas}) {
  const chartRef = useRef(null);
  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const dataAxis = ['故障零', '故障一', '故障二', '故障三', '故障四','故障五'];
    let data = [];
     if(datas.length==0){
 data = [50, 80, 120, 70, 90];
      }else{
     data = [Number(datas[0][2][0]+datas[0][2][1]), 
      Number(datas[1][2][0]+datas[1][2][1])
      ,Number(datas[2][2][0]+datas[2][2][1])
      ,Number(datas[3][2][0]+datas[3][2][1]),
     Number(datas[4][2][0]+datas[4][2][1]),
    Number(datas[5][2][0]+datas[5][2][1])];
       }
      
    const yMax = Math.max(...data) + 20;

    const dataShadow = [];
    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    const option = {
      title: {
        text: '模型数据展示',
        subtext: '点击柱状图可缩放',
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          textStyle: {
            color: '#fff',
          },
        },
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#999',
          },
        },
      },
      dataZoom: {
        type: 'slider',
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
            opacity: 0.8,
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            },
          },
          data: data,
        },
      ],
    };

    chartInstance.setOption(option);

    chartInstance.on('click', function (params) {
      console.log('点击柱状图', params.name);
      chartInstance.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + 2, data.length - 1)],
      });
    });

    return () => {
      chartInstance.dispose();
    };
  }, [datas]);

  return <div ref={chartRef} style={{ width: '90%', height: '300px' }}></div>;
}

export default Myehcarts;