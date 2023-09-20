import axios from 'axios';

const BASE_URL = 'http://54.180.93.80/api/';

export const baseInstance = axios.create({
  // withCredentials: true,
  baseURL: BASE_URL, // 기본 URL 설정
});

//axios대신 baseInstance

//authInstance
