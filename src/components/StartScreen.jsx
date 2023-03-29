import "../assets/styles/starterScreen.css";
// prettier-ignore
import {
  avatarOne, avatarTwo, avatarThree, avatarFour, avatarFive, 
  avatarSix, avatarSeven, avatarEight, avatarNine, avatarTen, avatarEleven, avatarTwelve, avatarThirteen, avatarFourteen
} from "../assets/images/avatar-images";

import { useState } from "react";

const StartScreen = ({ lang, changeLang, changeUser, changeStage }) => {
  const [formStep, setFormStep] = useState(1);

  const [userForm, setUserForm] = useState({
    name: "",
    surname: "",
    pin: "",
    avatar: avatarOne,
  });

  return (
    <div className="starter-screen">
      {formStep === 1 && (
        <div className="starter-screen_step-one">
          <div>
            <b>{lang.chooseLanguage}</b>
          </div>

          <div>
            <button
              onClick={() => changeLang("en")}
              style={{ margin: "0 1rem" }}
            >
              English
            </button>
            <button
              onClick={() => changeLang("pl")}
              style={{ margin: "0 1rem" }}
            >
              Polski
            </button>
          </div>
          <div>{lang.startScreenText1}</div>
          <button
            onClick={() => {
              changeUser({
                name: "Nicolaus",
                surname: "Copernicus",
                pin: "1234",
                avatar: avatarOne,
              });
              changeStage("loginScreen");
            }}
          >
            {lang.defaultUser}
          </button>
          <button
            onClick={() => {
              setFormStep(2);
            }}
          >
            {lang.userSetup}
          </button>
        </div>
      )}
      {formStep === 2 && (
        <form
          className="starter-screen_step-two"
          onSubmit={(e) => {
            e.preventDefault();
            setFormStep(3);
          }}
        >
          <div>{lang.startScreenText2}</div>
          <p>{lang.startScreenText3}</p>
          <label>
            {lang.name}:
            <input
              type="text"
              minLength={3}
              maxLength={30}
              value={userForm.name}
              onChange={(e) =>
                setUserForm((oldVal) => ({ ...oldVal, name: e.target.value }))
              }
              required
              pattern="[A-Za-z]+"
            />
          </label>
          <label>
            {lang.surname}:
            <input
              minLength={3}
              maxLength={30}
              type="text"
              value={userForm.surname}
              onChange={(e) =>
                setUserForm((oldVal) => ({
                  ...oldVal,
                  surname: e.target.value,
                }))
              }
              required
              pattern="[A-Za-z]+"
            />
          </label>
          <label>
            {lang.pin}:
            <input
              type="password"
              minLength={4}
              maxLength={6}
              pattern="[0-9]+"
              required
              value={userForm.pin}
              onChange={(e) =>
                setUserForm((oldVal) => ({ ...oldVal, pin: e.target.value }))
              }
            />
          </label>
          <button type="submit">{lang.next}</button>
        </form>
      )}
      {formStep === 3 && (
        <form
          className="starter-screen_step-three"
          onSubmit={(e) => {
            e.preventDefault();
            setFormStep(4);
          }}
        >
          <p>{lang.chooseAvatar}</p>
          <div className="starter-screen_step-three_avatar-list">
            <input type="radio" id="avatar1" name="avatar" value={avatarOne} />
            <label htmlFor="avatar1">
              <img src={avatarOne} alt={lang.chooseAvatar} />
            </label>
            <input type="radio" id="avatar2" name="avatar" value={avatarTwo} />
            <label htmlFor="avatar2">
              <img src={avatarTwo} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar3"
              name="avatar"
              value={avatarThree}
            />
            <label htmlFor="avatar3">
              <img src={avatarThree} alt={lang.chooseAvatar} />
            </label>
            <input type="radio" id="avatar4" name="avatar" value={avatarFour} />
            <label htmlFor="avatar4">
              <img src={avatarFour} alt={lang.chooseAvatar} />
            </label>
            <input type="radio" id="avatar5" name="avatar" value={avatarFive} />
            <label htmlFor="avatar5">
              <img src={avatarFive} alt={lang.chooseAvatar} />
            </label>
            <input type="radio" id="avatar6" name="avatar" value={avatarSix} />
            <label htmlFor="avatar6">
              <img src={avatarSix} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar7"
              name="avatar"
              value={avatarSeven}
            />
            <label htmlFor="avatar7">
              <img src={avatarSeven} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar8"
              name="avatar"
              value={avatarEight}
            />
            <label htmlFor="avatar8">
              <img src={avatarEight} alt={lang.chooseAvatar} />
            </label>
            <input type="radio" id="avatar9" name="avatar" value={avatarNine} />
            <label htmlFor="avatar9">
              <img src={avatarNine} alt={lang.chooseAvatar} />
            </label>
            <input type="radio" id="avatar10" name="avatar" value={avatarTen} />
            <label htmlFor="avatar10">
              <img src={avatarTen} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar11"
              name="avatar"
              value={avatarEleven}
            />
            <label htmlFor="avatar11">
              <img src={avatarEleven} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar12"
              name="avatar"
              value={avatarTwelve}
            />
            <label htmlFor="avatar12">
              <img src={avatarTwelve} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar13"
              name="avatar"
              value={avatarThirteen}
            />
            <label htmlFor="avatar13">
              <img src={avatarThirteen} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar14"
              name="avatar"
              value={avatarFourteen}
            />
            <label htmlFor="avatar14">
              <img src={avatarFourteen} alt={lang.chooseAvatar} />
            </label>
          </div>
          <div className="starter-screen_step-three_choosed-avatar">
            <p>{lang.yourAvatar}</p>
            <img src={userForm.avatar} alt={lang.yourAvatar} />
          </div>
          <div>
            <button
              style={{ margin: "0 1rem" }}
              onClick={() => {
                setFormStep(2);
              }}
            >
              {lang.back}
            </button>
            <button style={{ margin: "0 1rem" }} type="submit">
              {lang.next}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StartScreen;
