import axios from "axios";
import { URL } from "../utils/API";
import { axiosJWT } from "./UserService";
export const getAllJob = async (access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axiosJWT.get(`${URL}api/v1/job/getall/byUser`, {
    headers,
  });
  return res.data;
};

export const addUsertoJob = async (id, data, access_token) => {
  try {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    const res = await axiosJWT.post(
      `${URL}api/v1/job/addUsertoJob/${id}`,
      data,
      {
        headers,
      }
    );
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Có lỗi xảy ra khi gửi yêu cầu");
    }
  }
};

export const getJobUser = async () => {
  const res = await axios.get(`${URL}api/v1/job/getJob/ByUser`);
  return res.data;
};
export const getDetail = async (id, access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axiosJWT.get(`${URL}api/v1/job/${id}`, {
    headers,
  });
  return res.data;
};

export const deleteImgInJob = async (id, designId) => {
  const res = await axios.get(`${URL}api/v1/job/detele/img/${id}`, designId);
  return res.data;
};

export const cancelJob = async (id, access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axiosJWT.post(`${URL}api/v1/job/cancelJob/${id}`, null, {
    headers,
  });
  return res.data;
};

export const updateJob = async (id, data, access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axiosJWT.put(`${URL}api/v1/job/update/other/${id}`, data, {
    headers,
  });
  return res.data;
};
