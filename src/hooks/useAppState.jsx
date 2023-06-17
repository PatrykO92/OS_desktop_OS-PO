import { useState } from "react";

const useAppState = (initialState, name, icon) => {
  const [state, setState] = useState({
    programEnabled: false,
    hidden: false,
    name: name,
    icon: icon,
    ...initialState,
  });

  const handleState = (name, value) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDefaultState = () => {
    setState({
      programEnabled: false,
      hidden: false,
      name: name,
      icon: icon,
      ...initialState,
    });
  };

  return [state, handleState, handleDefaultState];
};

export { useAppState };
