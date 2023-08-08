import { useContext } from "react";
import { WholeAppContext } from "../App";
import axiosInstance from "../utils/axiosInstance";

const useRemoveUser = () => {
  const { changeUser } = useContext(WholeAppContext);

  const removeUser = async () => {
    console.log("Remove and logout user.");
    try {
      await axiosInstance.post("/api/v1/dj-rest-auth/logout/");
      changeUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    } catch (error) {
      // Handle error
      console.error("Error while removing user:", error);
    }
  };

  return removeUser;
};

export default useRemoveUser;
