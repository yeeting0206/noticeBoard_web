import axios from 'axios';

const BASE_URL = 'http://104.199.137.232/api';

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
