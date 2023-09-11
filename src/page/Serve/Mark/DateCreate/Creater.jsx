import React,{useState} from 'react'
import style from './Create.module.scss'
import { AwesomeButton } from "react-awesome-button";
import { Collapse } from 'antd';
import 'react-awesome-button/dist/styles.css';
import { useNavigate,useLocation } from 'react-router-dom'
import './butsty.scss'
import { BeakerIcon,ZapIcon  } from "@primer/octicons-react"; // custom icons
import { Input,message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import pic from '../../../../assets/pic/creatlogo.jpg'
import axios from 'axios';
const { Panel } = Collapse;
const text = `
  文本创建数据集是模型训练首要的操作.
  创建数据集及直接创建一个空的数据集，里面会有系统给的原先数据,
`;
const text1 = `
  文本创建并导入是一个便捷的操作.
  在创建途中直接跳过导入数据步骤,
  it can be found as a welcome guest in many households across the world.
`;
export default function Creater() {
  const {state}=useLocation()
    const [value, setValue] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
      messageApi.open({
        type: 'success',
        content: '创建预模型成功',
      });
    };
    const warning = () => {
      messageApi.open({
        type: 'warning',
        content: '名称不能为空',
      });
    };
    function handleChange(event) {
      setValue(event.target.value);
    }
    //按钮操作
    const navigate = useNavigate()
function test(){
   const data={fileId:state.id,name:value}
   if(data.name===' '){
warning()
   }else{
    axios.post('http://192.168.143.188:10010/result/addModel',data,{headers: {
      'Content-Type': 'application/json', 
      'Token': localStorage.getItem('token'),
    }}).then(res=>{
      console.log(res.data)
      success()
      setValue(null)
    })
   }
}

function testplus(){
  const data={fileId:state.id,name:value}
  if(data.name===' '){
    warning()
  }else{
    axios.post('http://192.168.143.188:10010/result/addModel',data,{headers: {
      'Content-Type': 'application/json', 
      'Token': localStorage.getItem('token'),
     }}).then(res=>{
      const data=res.data.data
     
      success()
      const name=value
      setValue(null)
      navigate('/contain/leading',{state:{name:name,id:data}})
     })
  }


}

function out(){
  window.history.back()
}
//拉缩框事件
const onChange = (key) => {
   console.log(key);
 };
    return (
        <div className={style.all}>
              {contextHolder}
            <div className={style.left}>
                <div className={style.title}>
                 模型预创建
                </div>
                <div className={style.contain}>
                   <div className={style.conl}>文件夹名称</div>
                   <div className={style.conr}>{state.name}</div>
                </div>
                <div className={style.contain} style={{marginTop:'-50px'}}>
                   <div className={style.conl}>名字</div>
                   <div className={style.conr}><Input placeholder="请填写名称" value={value} onChange={handleChange}/></div>
                </div>
                
                <div className={style.contain}>
                   <div className={style.conl}>平台</div>
                   <div className={style.conr}>PC</div>
                </div>
                <div className={style.contain} style={{marginTop:'20px'}}>
                   <div className={style.conl}>类型创建</div>
                   <div className={style.conr}>
                    <div className={style.picbor}>
                           <div className={style.picfont}>文本创建</div>
                           <div className={style.picbor1}> 
                           <img src={pic} alt=""  className={style.picimg}/>
                           <span className={style.yes}>
                                 <CheckOutlined className={style.dui}/>
                           </span>
                           </div>

                    </div>
                   </div>
                </div>
                <div className={style.dobut}>
                <AwesomeButton type="primary" before={<ZapIcon   />}  onPress={test}>创建</AwesomeButton>&nbsp;&nbsp;&nbsp;
                <AwesomeButton type="secondary" after={<BeakerIcon />}  onPress={testplus}>创建并导入</AwesomeButton>&nbsp;&nbsp;&nbsp;
                <AwesomeButton type="secondary" onPress={out}>取消并返回</AwesomeButton>
                </div>
            </div>
            <div className={style.right}>
              <div className={style.rtit}>
               操作解释
              </div>
              <div className={style.mainr}>
              <Collapse defaultActiveKey={['1']} onChange={onChange}>
      <Panel header="文本创建数据集" key="1">
        <p className={style.textcon}>{text}</p>
        
      </Panel>
      <Panel header="文本创建并导入" key="2">
        <p className={style.textcon}>{text1}</p>
      </Panel>
    </Collapse>
              </div>
            </div>
            </div>
    )
}
