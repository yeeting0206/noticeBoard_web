// 使用 axios 來串接後端 API
import axios from 'axios';

export const getAnnouncement = (id) =>
  axios.get(`/api/announcements/${id}`);

export const createAnnouncement = (data) =>
  axios.post('/api/announcements', data);

export const updateAnnouncement = (id, data) =>
  axios.put(`/api/announcements/${id}`, data);
