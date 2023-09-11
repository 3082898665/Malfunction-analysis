import React from 'react'
import style from './index.module.css'
import Head from '../../assets/pic/headlogo.jpg'
import { Button } from 'antd';
import Histoty from './History'
import Changepass from './ChangePassword'
export default function MyPerson() {
  return (
    <div className={style.contain}>
         <div className={style.head}>
           <img className={style.imghead} src={Head} alt='无法加载'></img>
          <div className={style.detail}>
              <div className={style.defont}>
                    <div style={{width:'80px'}}>用户号:</div>
                    <div >Jonh</div>
              </div>
              <div className={style.defont}>
                    <div style={{width:'80px'}}>邮箱号:</div>
                    <div >30828986665@qq.com</div>
              </div>
          </div>
          <div className={style.done}>
            <div className={style.but}>
           <Changepass/>
            </div>
            <div className={style.but}>
            <Button>修改绑定邮箱</Button>
            </div>
          

          </div>
         </div>
         <div className={style.main}>
<Histoty/>
         </div>

    </div>
  )
}
