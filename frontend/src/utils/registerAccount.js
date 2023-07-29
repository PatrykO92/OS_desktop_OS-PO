import axios from "axios";

import { defaultSettings } from ".";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

// const registerAccount = async (
//   email,
//   password1,
//   password2,
//   firstName,
//   lastName,
//   pin,
//   userTag,
//   avatar
// ) =>
//   axios
//     .post(`${apiUrl}api/v1/dj-rest-auth/registration/`, {
//       email,
//       password1,
//       password2,
//       first_name: firstName,
//       last_name: lastName,
//       pin,
//       user_tag: userTag,
//       avatar,
//       settings: defaultSettings,
//     })
//     .then((response) => {
//       console.log(response);
//       return response;
//     })
//     .catch((error) => {
//       console.log(error);
//       throw new Error(error.message);
//     });

// export default registerAccount;

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
    const response = await axios.post(
      `${apiUrl}api/v1/dj-rest-auth/registration/`,
      formData
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log("Error response:", error.response);
    throw new Error(error.message);
  }
};

export default registerAccount;
