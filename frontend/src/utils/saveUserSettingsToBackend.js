import axiosInstance from "./axiosInstance";

const saveUserSettingsToBackend = async (userSettings) => {
  console.log("Save user settings to backend");
  try {
    await axiosInstance.patch(
      `/api/v1/account/update_settings`,
      { settings: userSettings } // Pass the settings object as the second argument
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export default saveUserSettingsToBackend;
