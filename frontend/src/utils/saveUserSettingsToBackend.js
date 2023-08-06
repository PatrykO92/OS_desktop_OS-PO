import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const saveUserSettingsToBackend = async (userSettings) => {
  console.log("Save user settings to backend");
  try {
    const authToken = localStorage.getItem("authToken");
    await axios.patch(
      `${apiUrl}api/v1/account/update_settings`,
      { settings: userSettings }, // Pass the settings object as the second argument
      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export default saveUserSettingsToBackend;
