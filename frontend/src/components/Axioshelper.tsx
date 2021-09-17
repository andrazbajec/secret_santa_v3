import axios from "axios";
import React from "react";

class AxiosHelper {
    static post(url: string, data: any) {
        url = process.env.REACT_APP_API_KEY + url;
        console.log(url);
        return axios.post(url, data)
            .then((res) => {
                console.log(url);
                return res.data;
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export default AxiosHelper;