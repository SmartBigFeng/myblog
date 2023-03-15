import http from "@/utils/http"
export default class persetApi{
    static postFile=(data:any)=>{
        return http.post("/persetting/uploadFile",data);
    }
    static removeFile=(data:any)=>{
        return http.delete("/persetting/removeFile",data);
    }
    static updateInfo=(data:any)=>{
        return http.post("/persetting/updateInfo",data)
    }
    static getInfo = ()=>{
        return http.get("/persetting/getPersonInfo")
    }
};