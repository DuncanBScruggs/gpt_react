import axios from "axios";

export function AxiosHelper(method, url, fun, data = {}, body = {}) {

    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*', 
        'Accept' : 'application/json', // Thanks
    }
    axios(
        {
            method,
            url,
            data,
            body,
            headers,
        }
    ).then(res => fun(res)).catch(err => console.log('error: ', err));
}