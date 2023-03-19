import { useEffect, useState } from "react";

import { WindowsLogin } from "./components";
import "./main.css";

function App() {
  // useState hook to inform, at what stage is app currently
  const [windowsStage, setWindowsStage] = useState({
    loginScreen: true,
    workScreen: false,
    closeScreen: false,
  });

  useEffect(() => {}, []);

  return (
    <div className="whole-screen">
      {windowsStage.loginScreen && <WindowsLogin />}
    </div>
  );
}

export default App;
