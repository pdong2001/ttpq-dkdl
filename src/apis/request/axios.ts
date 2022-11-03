import axios, { AxiosResponse } from 'axios';

export const onFullfilledRequest = (response: AxiosResponse) => response;
export const onRejectedResponse = (error: any): any => Promise.reject(error);

const publicRequest = axios.create({
  baseURL: `${import.meta.env.TTPQ_BASE_URL}`,
});

publicRequest.interceptors.response.use(onFullfilledRequest, onRejectedResponse);

export default publicRequest;
