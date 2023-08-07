import axiosInstance from "./axiosInstance";

import { defaultSettings } from ".";

const registerAccount = async (
  email,
  password1,
  password2,
  firstName,
  lastName,
  pin,
  userTag,
  avatarFile
) => {
  console.log("Register account");
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password1", password1);
  formData.append("password2", password2);
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("pin", pin);
  formData.append("user_tag", userTag);
  formData.append("avatar", avatarFile);
  formData.append("settings", JSON.stringify(defaultSettings));

  try {
    const response = await axiosInstance.post(
      `/api/v1/dj-rest-auth/registration/`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error.response.data);
    throw new Error(error.message);
  }
};

export default registerAccount;
