import {useEffect} from "react";

export const options = {
  serializer: (obj: any) => {

    return obj;
  },
  parser: (str: any) => {

    return new Date(str);
  },
  logger: (error: any) => {
    return error
  },
  syncData: false
};




export const resetLocalStorage = () => {
  return localStorage.clear()
}
