import service from "./index";
export const addCount= () => {
    return service.get('/user/addCount')
}
export const getCount= () => {
    return service.get('/user/getCount')
}
