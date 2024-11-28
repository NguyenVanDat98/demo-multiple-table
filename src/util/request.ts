import { notification } from "antd";
import axios from "axios";

const HOST = 'https://pharma-dashboard.congtyso.com';

export function setupAxios() {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['companyid'] = '99999';
    axios.defaults.headers.common.Authorization = "Bearer " + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaWQiOiI4ODg4OCIsInN1YiI6IjY1Yjc1NmQzNTMwMGE3ZDZlMjA2YzNiOSIsImp0aSI6IjJlZjBlZjY3LTZlYmMtNGFkMy05Y2MyLWM1MTFiNmM1Y2RiNiIsImF1ZCI6Ijk5OTk5IiwiaWF0IjoxNzMyODAwNTE1LCJleHAiOjE3NDE0NDA1MTV9.VdZWoWjQnwsyeNuEGMweIve-BlP-XEh0bSFTwgI9N3PwX7J95UvjvalPQrt_n2DPLpPUoRw3do4cTDV9EfmZKbg4492EtvVG-V_In2ObFmBFLzLF5gjJFf4Z4w3ZXCt6YiHDU1Ru6eHytx0fTo7j3iVG0PqPfoYNMGr1GXe7skw";

}


type paramSearch ={
    keyword?:string
}

export default {
    searchProducts :async({keyword}:Partial<paramSearch>)=>{
        try {
            const data = await axios.post(`${HOST}/api/v1/product-search`,{
                keyword,
                limit:10,
            })
            return data.data as ProductBase[]
        } catch (error) {
            notification.error( {
                message: String(error?.message),
                closable:true,
                showProgress:true
            })
            console.error(error);
            return []
        }
    },
    async login(){
        try {
           const login = await axios.post(`${HOST}/api/v1/staff-login`,{
            login:"admin",
            password:"The@gioi24!"
           })
           axios.defaults.headers.common.Authorization = "Bearer " + login.data.token;

        } catch (error) {
            console.error(error);
            
        }
    }
}
