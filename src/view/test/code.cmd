import React, { useState } from 'react'
import { fadeIn, fadeOut } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';
export default function Myindex() {
    const [show, setShow] = useState(true);
    const styles = StyleSheet.create({
        fadeIn: {
          animationName: fadeIn,
          animationDuration: '1s'
        },
        fadeOut: {
          animationName: fadeOut,
          animationDuration: '1s'
        }
      });


    return (
      <div className="App">
        <button onClick={() => setShow(!show)}>Toggle</button>
        {show ? (
          <div className={css(styles.fadeIn)}>Hello</div>
        ) : (
          <div className={css(styles.fadeOut)}>Goodbye</div>
        )}
      </div>
    )
}
----------------------------------------------------------------
import React from "react";
import EchartsReact from "echarts-for-react";
const option = {
  series: [
    {
      type: "pie",
      data: [
        { value: 0.979, name: "Type one" },
        { value: 0.575, name: "Type Two" },
        { value: 0.7684, name: "Type Third" },
        { value: 0.8428, name: "Type Four" },
        { value: 0.8829, name: "Type Five" },
        { value: 0.989, name: "Type Six" },
      ],
    },
  ],
  tooltip: {
    trigger: "item",
    formatter: function (params) {
      return `${params.name}: ${params.value} (${params.percent}%)`;
    },
  },
// color:['#2980B9','#74ebd5','#667db6','#FFD700','#2980B9 ','#f2fcfe']
};

const Echarts = () => {
  return <EchartsReact option={option} />;
};

export default Echarts
1代3d图
--------------------------------------------------------------------
import React from 'react';
import EchartsReact from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { graphic } from 'echarts';

import { Bar3DChart } from 'echarts-gl/charts';
import { Grid3DComponent } from 'echarts-gl/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([Bar3DChart, Grid3DComponent, CanvasRenderer]);

class MyChart extends React.Component {
  // 定义你的option
  getOption = () => {
    return {
      // 使用grid3D组件
      grid3D: {
        viewControl: {
          alpha: 30,
          beta: 120
        }
      },
      // 使用xAxis3D, yAxis3D, zAxis3D组件
      xAxis3D: {
        type: 'category',
        data: ['A', 'B','C']
      },
      yAxis3D: {
        type: 'category',
        data: ['', '']
      },
      zAxis3D: {
        type: 'value'
      },
      // 使用bar3D系列绘制柱状图
      series: [
        {
          type: 'bar3D',
          // 设置数据，每一项表示一个柱子的位置和高度
          data: [
            {value: [0, 0, 0.80]},
            {value: [1, 0, 0.90]},
            {value: [2, 0, 0.78]},
            {value: [2, 1, 0.95]},
            {value: [0, 1, 0.77]},
            {value: [1, 1, 0.89]},
          ],
          // 设置柱子的颜色
          itemStyle: {
            color: '#6DD5FA'
            },
          // 设置柱子的高光效果
          emphasis: {
            itemStyle: {
              color: '#86A8E7'
            }
          }
        }
      ]
    };
  };

  render() {
    return (
      <div>
        <EchartsReact option={this.getOption()} />
      </div>
    );
  }
}

export default MyChart;
--------------------------------------------------
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import 'echarts-gl';

const option = {
    tooltip: {},
    visualMap: {
        max: 20,
        inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        }
    },
    xAxis3D: {
        type: 'category',
        data: ['A'],
        name: 'X',
        nameTextStyle: {
            fontSize: 16,
            color: '#fff'
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        }
    },
    yAxis3D: {
        type: 'category',
        data: ['B'],
        name: 'Y',
        nameTextStyle: {
            fontSize: 16,
            color: '#fff'
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        }
    },
    zAxis3D: {
        type: 'value',
        nameTextStyle: {
            fontSize: 16,
            color: '#fff'
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        }
    },
    grid3D:{
      boxWidth : 200,
      boxDepth : 80,
      viewControl :{
          // projection:'orthographic'
      }
    },
    series:[{
      type:'bar3D',
      data:[[0,0,0,10]],
      shading:'lambert',
      label:{
          textStyle:{
              fontSize : 16,
              borderWidth : 1
          }
      },
      itemStyle:{
          opacity : 0.8
      }
    }]
};

const Echarts3DBar = () => (
  <ReactEcharts option={option} echarts={echarts} style={{height:'500px'}} />
);
