import { TaskBar, Desktop } from "./src/components";
import "./src/assets/styles/workScreen.css";

const WorkScreen = () => {
  return (
    <div className="work-screen">
      <Desktop />
      <TaskBar />
    </div>
  );
};

export default WorkScreen;
