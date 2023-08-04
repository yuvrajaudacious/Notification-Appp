import axios, { AxiosRequestConfig, Method } from "axios";
import React from "react";
// data: AxiosRequestConfig["data"] | AxiosRequestConfig["params"],

export const ApiCaller = (
  url: any,
  host: string,
  data: object,
  method: Method = "GET",
  token: string = localStorage.getItem("authToken") || ""
): Promise<any> => {
  return axios({
    url: `${host}${url}`,
    data,
    method,
    headers: { Authorization: token },
  });
};
