import {Navigate} from 'react-router-dom'
import Summary from '../page/Summary/useSummary'
// import AsmOver from '../page/Serve/AsmOverall/AsmOverall'
import Mark from '../page/Serve/Mark/Mark'
import MyContain from '../view/User/Main/MyContain'
import DowmLoad from '../page/DownLoad/Asist'
import Creater from '../page/Serve/Mark/DateCreate/Creater'
import Mymodule from '../page/Mymodule/Mymodule'
import MyTrain from '../page/Train/MyTrain'
import Fchild from '../page/Train/children/First/Mystepone'
import Schild from '../page/Train/children/second/Mysteptwo'
import Tchild from '../page/Train/children/Third/Mystepthrid'
import Mycailbrate from '../page/Cailbrate/MyCailbrate'
import Myleading from '../page/Leadin/Myleading'
import Mylogin from '../view/Login/index'
import Myregister from '../view/Register/index'
import Mytest from '../view/test/index'
import AddModule from '../page/Addmodule/AddModule'
import AimyPage from '../page/AiPage/AimyPage'
import MyPerson from '../page/PersonCenter/MyPerson'
import MyTrainT from '../page/Train/MyTraintwo'
import MyCom from '../page/MoComponent/Mymo'
import CAll from '../page/MoComponent/children/allmodel'
import SCom from '../page/MoComponent/children/comp'
import CSignle from '../page/MoComponent/children/singlemo'
import Signlet from '../page/MoComponent/children/signle2'
const routes=[
    {
        path:'contain',
        element:<MyContain/>,
        children:[
            {
                path:'cailbrate',
                element:<Mycailbrate/>
            },
            {
                path:'aymodel',
                element:<MyCom/>,
                children:[
                    {
                        path:'allmodel',
                        element:<CAll/>
                    },
                    {
                        path:'forestmodule',
                        element:<CSignle/>
                    },
                    {
                        path:'xgboostmodule',
                        element:<Signlet/>
                    },
                    {
                        path:'component',
                        element:<SCom/>
                    },
                ]
            },
            {
                path:'summary',
                element:<Summary/>
            },
            {
                path:'leading',
                element:<Myleading/>
            },
            {
                path:'addmodule',
                element:<AddModule/>
            },
            {
                path:'aiPage',
                element:<AimyPage/>
            },
            {
                path:'person',
                element:<MyPerson/>
            },
//测试版本训练
{
    path:'traint',
  
    element: <MyTrainT/>,
    children:[
        {
            path:'stepone',
            element:<Fchild/>
        },
        {
            path:'steptwo',
            element:<Schild/>
        },
        {
            path:'stepthird',
            element:<Tchild/>
        },
    ]
},

            {
                path:'train',
              
                element: <MyTrain/>,
                children:[
                    {
                        path:'stepone',
                        element:<Fchild/>
                    },
                    {
                        path:'steptwo',
                        element:<Schild/>
                    },
                    {
                        path:'stepthird',
                        element:<Tchild/>
                    },
                ]
            },

            {
                path:'mymodule',
                element:<Mymodule/>
            },

            {
                path:'mark',
                element:<Mark/>,
              
            },
            {
                path:'create',
                element:<Creater/>
            },
            {
                path:'load',
                element:<DowmLoad/>
            },
        ]
    },
    {
        path:'/',
           element:<Navigate to='/login'></Navigate>
    },
    {
        path:'login',
        element:<Mylogin/>
    },
    {
        path:'register',
        element:<Myregister/>
    },
    {
        path:'test',
        element:<Mytest/>
    },

]
export default routes