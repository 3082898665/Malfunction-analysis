import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Histogram = () => {
  const chartContainer = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartContainer.current);

 
   const option = {
     
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
          data: ['故障零', '故障一', '故障二', '故障三', '故障四', '故障五', 'f1-score']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} %'
          },
          max:100,
          min:40
        },
        series: [
          {
            name: '随机森林',
            type: 'line',
            data: [72,69,49,94,89,96,79],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: 'Xgboost',
            type: 'line',
            data: [86,89,88,89,95,97,91],
            markPoint: {
              data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
            },
            markLine: {
              data: [
                { type: 'average', name: 'Avg' },
                [
                  {
                    symbol: 'none',
                    x: '90%',
                    yAxis: 'max'
                  },
                  {
                    symbol: 'circle',
                    label: {
                      position: 'start',
                      formatter: 'Max'
                    },
                    type: 'max',
                    name: '最高点'
                  }
                ]
              ]
            }
          }
        ]
      };
    myChart.setOption(option);

    // 在组件销毁时，销毁图表实例
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartContainer} style={{ width: '70rem', height: '290px' }} />;
};

export default Histogram;