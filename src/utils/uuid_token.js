import {v4 as uuidv4} from "uuid";
export const getUUID = ()=>{
    //先查看本地存储有没有uuid
    let uuid_token = localStorage.getItem('uuid_token');
    //如果没有就新建一个
    if (!uuid_token){
        uuid_token = uuidv4();
        //存到本地存储中
        localStorage.setItem('uuid_token',uuid_token);
    }
    return uuid_token;

}
