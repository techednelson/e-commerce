import axios from 'axios';

export const getFetch = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());

export const getAxios = (url: string, params = {}) =>
  axios({ url, method: 'GET', params }).then((res) => res.data);

export const postAxios = (url: string, data = {}) =>
  axios({ url, method: 'POST', data }).then((res) => res.data);
