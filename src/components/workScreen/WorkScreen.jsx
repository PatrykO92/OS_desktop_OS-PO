import { TaskBar, Desktop } from "./src/components";
import "./src/assets/styles/workScreen.css";

const WorkScreen = ({ lang }) => {
  return (
    <div className="work-screen">
      <Desktop />
      <TaskBar lang={lang} />
    </div>
  );
};

export default WorkScreen;
