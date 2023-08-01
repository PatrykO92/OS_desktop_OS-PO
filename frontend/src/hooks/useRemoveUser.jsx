import { useContext } from "react";
import { WholeAppContext } from "../App";

const useRemoveUser = () => {
  const { changeUser } = useContext(WholeAppContext);

  const removeUser = () => {
    changeUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  return removeUser;
};

export default useRemoveUser;
