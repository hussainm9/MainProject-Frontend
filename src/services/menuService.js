// menuService.js

import axiosInstance from '../config/axios';

export async function createMenu(id, formData, token) {
  try {

    console.log(id, 'resId', formData, token);
    const response = await axiosInstance.post(`/api/restarunt/${id}/menu`, formData, {
      headers: {
        Authorization: token
      }
    });
    console.log(response.data);
    return response.data

  } catch (e) {
    console.log('Error fetching menu items:', e);


  }
}

export async function fetchMenuItems(resId) {
  try {
    console.log(resId, 'fetch');
    const response = await axiosInstance.get(`/api/${resId}/getOne`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
}

export async function deleteMenuItem(resId, itemId) {
  try {
    await axiosInstance.delete(`/api/${resId}/${itemId}/delete`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });
    console.log('Menu item successfully deleted');
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
}
export async function updateMenuItem(resId, itemId, formData, token) {
  console.log(resId, itemId, token, formData, 'update menu item');
  try {
    const response = await axiosInstance.put(
      `/api/restarunt/${resId}/${itemId}/update`, // Ensure correct endpoint
      formData,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
}