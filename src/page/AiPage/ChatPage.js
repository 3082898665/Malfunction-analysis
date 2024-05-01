import React, { useState } from 'react'
import style from './index.module.css'
import Clear from '../../assets/pic/clear.png'
import axios from 'axios'
import Smile from '../../assets/pic/smile.png'
import Aiper from '../../assets/pic/aiper.png'
import { aipage } from '../../request/api'
import {
    LoadingOutlined,
    SyncOutlined,
} from '@ant-design/icons';
export default function ChatPage() {
    const [talklist, setlist] = useState([
    ])
    const [userword, setuserword] = useState('')

    function cleartalk() {
        setlist([])
    }
    function changew(event) {

        console.log(event.target.value)
        setuserword(event.target.value)
    }
    let k = 0
    async function send(event) {
        if (event.keyCode == 13) {
            console.log(1111)
            setlist(old => {
                return [...old, { ma: null, user: userword }]
            })

            axios.get('http://192.168.182.188:10010/user/talk?words=' + userword)
                .then(res => {
                    console.log(res.data)

                    setlist(old => {
                        const oldarr = old.filter(item => item.ma != null)
                        console.log(oldarr)
                        return [...oldarr, { ma: res.data, user: userword }]
                    })

                    setuserword('')
                })
            k++
        }
    }
    return (
        <div>
            <div className={style.main}>
                {talklist.map((item, index) => {
                    return (
                        <div key={index}>

                            <div className={style.conversation}>
                                <div className={style.senduser}>
                                    {item.user}
                                </div>
                            </div>
                            <div className={style.conversationl}>
                                <img className={style.aipic} src={Aiper}></img>
                                <div className={style.sendcom}>

                                    {!item.ma ?
                                        <SyncOutlined spin /> :
                                        <> {item.ma} <img src={Smile} className={style.smile}></img>
                                        </>


                                    }

                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={style.footer}>
                <div className={style.lf} onClick={cleartalk}>
                    <img className={style.clearpic} alt='clear' src={Clear}></img>
                    <span className={style.clfont}>清理聊天</span>
                </div>
                <input className={style.inp} onChange={changew} value={userword} onKeyDown={send}></input>
            </div>
        </div>
    )
}
