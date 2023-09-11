import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const  Yzmodel= ({data}) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartContainer.current);

    const options = {
       
        legend: {
          data: ['训练完模型', '验证完模型']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '故障零', max: 6500 },
            { name: '故障一', max: 16000 },
            { name: '故障二', max: 30000 },
            { name: '故障三', max: 38000 },
            { name: '故障四', max: 52000 },
            { name: '故障五', max: 25000 }
          ]
        },
        series: [
          {
            // name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: '训练完数据'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: '验证完数据'
              }
            ]
          }
        ]
      };

    myChart.setOption(options);

    // 在组件销毁时，销毁图表实例
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartContainer} style={{ width: '500px', height: '450px',display:data.length>0?'':'none' }} />;
};

export default Yzmodel;