import service from "./index";
export const login = (data) => {
    return service.post('user/login/' + data[0] + '/' + data[1])
}
export const sendyzm = (data) => {
    return service.post('user/sendCode/' + data + '/' + 0)
}
export const getmodule = (data) => {
    console.log(data)
    return service.post('result/upload', data)
}
export const createwjj = (data) => {
    console.log(data)
    return service.post('result/addFile', data)
}
export const getdatalist = () => {
    return service.get('result/getModel/1')
}
export const delectlist = (data) => {
    return service.post('/result/deleteModel?id='+data)
}
export const addmodule = (data) => {

    return service.post('/result/addDataForModel?id='+data)
}
export const getwjinfo = (data) => {

    return service.get('result/selectModelByFileId?fileId='+data)
}
export const getsjname = (data) => {

    return service.get('/result/getFileName/'+data)
}

export const runxl = (data) => {
    return service.post('/result/startRun?id='+data+'&&type='+'0')
}

export const yzxl = (data) => {
    return service.post('/result/startRun?id='+data+'&&type='+'1')
}

export const heightxl = (data) => {
    return service.post('/result/run1?id='+data[0]+'&nums='+data[1]+'&status='+data[2])
}
export const upload = () => {
    return service.post('/result/getPkl?modelId=1689960994354970625')
}
export const heightyz = (data) => {
    return service.post('/result/run2?id='+data[0]+"&status="+data[1])
}
export const getModelCount = () => {
    return service.get('/result/getModelCount')
}
export const getModelFinish = () => {
    return service.get('/result/getModelFinish')
}
export const getModelPercent = () => {
    return service.get('/result/getModelPercent')
}
export const getyzmodel = (id) => {
    return service.get('/result/getRun2?id='+id)
}
export const deleteModelDto= (id) => {
    return service.post('/result/deleteModelDto?id='+id)
}
export const sethis= (data) => {
    console.log(data)
    return service.post('/history/save',data)
}
export const getxldata= (data) => {
  
    return service.get('/result/getModelById?id='+data[0]+'&status='+data[1])
}
export const getmaxn= () => {
    return service.get('/result/getModelPercentDto')
}
export const getWide= () => {
    return service.get('/result/getWide')
}
export const getOrderModel= () => {
    return service.get('/result/getOrderModel')
}
export const getAllByType= (s) => {
    return service.get('/result/getAllByType?status='+s)
}
export const selectHistory= () => {
    return service.get('/history/selectHistory')
}
export const getUserCount= (data) => {
    return service.get('/result/getUserCount/'+data)
}
export const getModelCreator= (data) => {
    return service.get('/result/getModelCreator/'+data)
}

export const getModelDone= () => {
    return service.get('/result/getModelDone')
}


