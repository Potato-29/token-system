import {
  cancelTokenUrl,
  createTokenUrl,
  getTokenStatusUrl,
} from "../constants/urls";
import axios from "../utils/axios";

export const createToken = async (body) => {
  const { data } = await axios.post(createTokenUrl, body);
  return data;
};

export const getTokenStatus = async (id) => {
  const { data } = await axios.get(`${getTokenStatusUrl}/${id}`);
  return data;
};

export const cancelToken = async (id) => {
  const { data } = await axios.get(`${cancelTokenUrl}/${id}`);
  return data;
};
