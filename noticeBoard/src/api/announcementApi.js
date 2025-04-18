import axios from 'axios';

// 虛擬機IP開放8080port
const BASE_URL = 'http://192.168.1.100:8080/api';

export const getAnnouncement = (id) =>
  axios.get(`${BASE_URL}/announcements/${id}`);

export const addAnnouncement = (data) =>
  axios.post(`${BASE_URL}/announcements`, data);

export const updateAnnouncement = (id, data) =>
  axios.put(`${BASE_URL}/announcements/${id}`, data);

export const deleteAnnouncement = (id) =>
  axios.delete(`${BASE_URL}/delete/${id}`);

export const listAnnouncements = () =>
  axios.get(`${BASE_URL}/search`);
