import axios from "axios";

export default function AxiosHelper({
    method,
    route,
    token = '',
    data = {},
    body = {},
    fun = (x) => console.log(x),
}) {
    const api_route = `http://localhost:8000/${route}`
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json', // Thanks
        'Authorization': `Bearer ${token}`
    }
    axios({
        method,
        url: api_route,
        data,
        body,
        headers,
    })
        .then(res => fun(res))
        .catch(err => console.log('error: ', err));
}