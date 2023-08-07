import axiosInstance from "./axiosInstance";
import { defaultUserIcon } from "../assets/icons";

const getUserDetail = async () => {
  console.log("Get User details");
  try {
    const response = await axiosInstance.get(`/api/v1/dj-rest-auth/user/`);

    const {
      pk,
      email,
      first_name,
      last_name,
      pin,
      user_tag,
      avatar,
      settings,
    } = response.data;

    return {
      pk,
      email,
      name: first_name,
      lastName: last_name,
      pin,
      avatar: `${avatar === null ? defaultUserIcon : avatar}`,
      userTag: user_tag,
      settings,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getUserDetail;
