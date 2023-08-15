import axios from "axios";
import { URL } from "../utils/API";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(`${URL}api/v1/users/loginUser`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const refreshToken = async (token) => {
  const res = await axios.post(`${URL}api/v1/users/refresh_token`, {
    token: token,
  });

  const newAccessToken = res.data.access_token;
  localStorage.setItem("access_token", JSON.stringify(newAccessToken));
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axiosJWT.get(`${URL}api/v1/users/${id}`, {
    headers,
  });
  return res.data;
};

export const loginAdmin = async (data) => {
  const res = await axios.post(`${URL}api/v1/users/loginAdmin`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const getAll = async () => {
  const res = await axios.get(`${URL}api/v1/users/getAll`);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axios.post(`${URL}api/v1/users/updateAccount/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const createUser = async (data, access_token) => {
  const res = await axios.post(`${URL}api/v1/users/register`, data);
  return res.data;
};

export const deleteUSer = async(id)=>{
  const res = await axios.delete(`${URL}api/v1/users/delete/${id}`);
  return res.data;
}
export const getUserByCustomer = async()=>{
  const res = await axios.get(`${URL}api/v1/users/getAll/iscustomer`);
  return res.data;

}
export const getToatalMoneyCustomer = async()=>{
  const res = await axios.get(`${URL}api/v1/users/totalMoney/dashboard/admin`)
  return res.data
}

export const getAllNV = async()=>{
  const res = await axios.get(`${URL}api/v1/users/getNhanVien/getAll`)
  return res.data
}

export const getAllGuest= async()=>{
  const res = await axios.get(`${URL}api/v1/users/getGuest/getAll`)
  return res.data
}