import axios from "axios";
import React from "react";

 interface GetAxiosProps extends React.ProviderProps<any> {
     url: string;
     params?:any
 }
const url = 'http://localhost:8081/get';
export default class TripService {
    static async getAll() {
        const response = await axios.get(url, {
            params: {

            }
        })
        return response.data

    }

}