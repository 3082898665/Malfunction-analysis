import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts-gl';



function ThreeHistogram({datas}) {


  const data = [
  [0, 0,Number(datas[0][2][0]+datas[0][2][1]) ],
  [0, 1, Number(datas[1][2][0]+datas[1][2][1])],
  [0, 2, Number(datas[2][2][0]+datas[2][2][1])],
  [0, 3, Number(datas[3][2][0]+datas[3][2][1])],
  [0, 4, Number(datas[4][2][0]+datas[4][2][1])],
  [0, 5, Number(datas[5][2][0]+datas[5][2][1])],
];
const colors = ['#00a8ff', '#0097e6', '#e84118', '#c23616', '#44bd32', '#16a085', '#fbc531', '#ffc312'];
const option = {
    tooltip: {
        trigger: 'item',
        formatter: (params) => {
            const zValue = params.value[2];
            // 只显示 z 轴的值
            return `准确率: ${zValue}`;
          },
      },
  grid3D: {
    boxWidth: 200,
    boxDepth: 80,
    viewControl: {
      distance: 290,
      alpha: 5,
      beta: 1
    },
  },
  xAxis3D: {
    type: 'category',
    data: ['故障零','故障一', '故障二', '故障三', '故障四','故障五'],
    
  },
  yAxis3D: {
    type: 'category',
    data: ['I'],
    
  },
  zAxis3D: {
    type: 'value',
  },
  series: [
    {
      type: 'bar3D',
      data: data.map((item,index) => ({
        value: [item[1], item[0], item[2]],
        itemStyle: {
          color: colors[index % colors.length],
        },
      })),
      shading: 'lambert',
      label: {
        textStyle: {
          fontSize: 15,
          borderWidth: 1,
        },
      },
    },
  ],
};
  return (
<ReactEcharts
    echarts={echarts}
    option={option}
    style={{ height: '400px', width: '150%',marginTop:'-19%',marginLeft:'-20%' }}
    className="react_for_echarts"
  />
  )
}





export default ThreeHistogram;