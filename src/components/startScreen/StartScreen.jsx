import "./starterScreen.css";
import { useState } from "react";

const StartFormComponent = ({ lang, changeLang, changeUser, changeStage }) => {
  const [user, setUser] = useState({
    name: "nicolaus",
    surname: "copernicus",
    pin: "1234",
  });

  return (
    <div className="starter-screen">
      <div>
        <label htmlFor="language-select">
          <b>{lang.language}</b>
        </label>
        <select
          name="language"
          id="language-select"
          defaultValue={"en"}
          onChange={(event) => changeLang(event.target.value)}
        >
          <option value="en">English</option>
          <option value="pl">Polski</option>
        </select>
      </div>

      <div>{lang.startScreenText1}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          changeUser(user);
          changeStage();
        }}
      >
        <div>{lang.startScreenText2}</div>
        <label>
          {lang.name}: <input type="text" value={user.name} />
        </label>
        <label>
          {lang.surname}: <input type="text" value={user.surname} />
        </label>
        <label>
          {lang.pin}: <input type="text" value={user.password} />
        </label>
        <button type="submit">Ok</button>
      </form>
    </div>
  );
};

export default StartFormComponent;
