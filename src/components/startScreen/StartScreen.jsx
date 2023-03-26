import "./starterScreen.css";
import { useState } from "react";
import { nicolausCopernicusAvatar } from "../../assets/images/avatar-images";

const StartFormComponent = ({ lang, changeLang, changeUser, changeStage }) => {
  const [userForm, setUserForm] = useState({
    name: "Nicolaus",
    surname: "Copernicus",
    pin: "1234",
    avatar: nicolausCopernicusAvatar,
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
          onChange={(e) => changeLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="pl">Polski</option>
        </select>
      </div>

      <div>{lang.startScreenText1}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          changeUser(userForm);
          changeStage("loginScreen");
        }}
      >
        <div>{lang.startScreenText2}</div>
        <label>
          {lang.name}:{" "}
          <input
            type="text"
            minLength={3}
            maxLength={12}
            value={userForm.name}
            onChange={(e) =>
              setUserForm((oldVal) => ({ ...oldVal, name: e.target.value }))
            }
          />
        </label>
        <label>
          {lang.surname}:
          <input
            minLength={3}
            maxLength={20}
            type="text"
            value={userForm.surname}
            onChange={(e) =>
              setUserForm((oldVal) => ({ ...oldVal, surname: e.target.value }))
            }
          />
        </label>
        <label>
          {lang.pin}:{" "}
          <input
            type="number"
            value={userForm.pin}
            onChange={(e) =>
              setUserForm((oldVal) => ({ ...oldVal, pin: e.target.value }))
            }
          />
        </label>
        <button type="submit">Ok</button>
      </form>
    </div>
  );
};

export default StartFormComponent;
