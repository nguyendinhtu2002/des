import axios from "axios";
import { URL } from "../utils/API";
import { axiosJWT } from "./UserService";

export const getAllJob = async () => {
  const res = await axios.get(`${URL}api/v1/job/getall/byUser`);
  return res.data;
};

export const addUsertoJob = async (id, data) => {
  try {
    const res = await axios.post(`${URL}api/v1/job/addUsertoJob/${id}`, data);
    return res.data;
  } catch (error) {
    if (error.response) {
      // Lỗi có phản hồi từ server
      throw new Error(error.response.data.message);
    } else {
      // Lỗi không có phản hồi từ server
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

export const createJob = async (data,access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axiosJWT.post(`${URL}api/v1/job/createJob`, data,{
    headers
  });
  return res.data;
};

export const getAllByGuest = async (guestId, access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = await axiosJWT.get(
    `${URL}api/v1/job/getall/byGuest/${guestId}`,
    // {
    //   params: { guestId },
    // },
    {
      headers,
    }
  );
  return res.data;
};
export const updateByGuest = async (id, data, access_token) => {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const res = axiosJWT.put(
    `${URL}api/v1/job/update/guest/${id}`,
    data,
    {
      headers,
    }
  );
  return res.data;
};
