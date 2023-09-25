import axios from 'axios';

const BASE_URL = 'http://www.day-trip.store/api';

export const baseInstance = axios.create({
  // withCredentials: true,
  baseURL: BASE_URL, // 기본 URL 설정
});

//axios대신 baseInstance

//authInstance
