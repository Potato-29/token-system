import { createTokenUrl } from "../constants/urls";
import axios from "../utils/axios";

export const createToken = async (body) => {
  const { data } = await axios.post(createTokenUrl, body);
  return data;
};
