import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Myshowpage2 = () => {
  const chartContainer = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartContainer.current);
const option = {
    legend: {
      top: 'left'
    },
    toolbox: {
      show: true,
      feature: {
      
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [10, 60],
        center: ['50%', '60%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: [
          { value: 40, name: '故障零' },
          { value: 38, name: '故障一' },
          { value: 32, name: '故障二' },
          { value: 30, name: '故障三' },
          { value: 28, name: '故障四' },
          { value: 26, name: '故障五' },

        ]
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

export default Myshowpage2;