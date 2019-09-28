import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../type/index";
import { buildUrl } from "../helpers/url";
import { transformRequest, transformResponse } from "../helpers/data";
import { processHeaders } from "../helpers/headers";
import xhr from './xhr';

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res);
  });
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildUrl(url!, params);
}

function transformRequestData(config: AxiosRequestConfig): void {
  return transformRequest(config.data);
}

function transformHeaders(config: AxiosRequestConfig): void {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data);
  return res;
}