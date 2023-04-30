import "../assets/styles/starterScreen.css";
import {
  polishFlag,
  gbFlag,
  plusCircleIcon,
  userIcon,
  arrowLeftIcon,
  checkIcon,
  arrowRightIcon,
} from "../assets/icons";
// prettier-ignore
import {
  avatarOne, avatarTwo, avatarThree, avatarFour, avatarFive, 
  avatarSix, avatarSeven, avatarEight, avatarNine, avatarTen, avatarEleven, avatarTwelve, avatarThirteen, avatarFourteen
} from "../assets/images/avatar-images";

import { useState } from "react";

const StartScreen = ({ lang, changeLang, changeUser, changeStage }) => {
  const [showPin, setShowPin] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const [userForm, setUserForm] = useState({
    name: "",
    surname: "",
    pin: "",
    avatar: avatarOne,
  });

  const handleAvatarChange = (e) => {
    setUserForm((oldVal) => ({
      ...oldVal,
      avatar: e.target.value,
    }));
  };

  return (
    <div className="starter-screen">
      {formStep === 1 && (
        <div className="starter-screen_step-one">
          <div>
            <b>{lang.chooseLanguage}</b>
          </div>

          <div>
            <button
              onMouseOver={() => {
                changeLang("en");
              }}
              onClick={() => {
                changeLang("en");
                setFormStep(2);
              }}
            >
              <img src={gbFlag} alt="English" />
            </button>
            <button
              onMouseOver={() => {
                changeLang("pl");
              }}
              onClick={() => {
                changeLang("pl");
                setFormStep(2);
              }}
            >
              <img src={polishFlag} alt="Polski" />
            </button>
          </div>
        </div>
      )}

      {formStep === 2 && (
        <div className="starter-screen_step-two">
          <div>
            <p>{lang.startScreenText1}</p>
            <p>{lang.startScreenText2}</p>
          </div>

          <button
            onClick={() => {
              changeUser({
                name: "Nicolaus",
                surname: "Copernicus",
                pin: "",
                avatar: avatarOne,
              });
              changeStage("loginScreen");
            }}
          >
            <img src={userIcon} alt="" />
            {lang.defaultUser}
          </button>
          <button
            onClick={() => {
              setFormStep(3);
            }}
          >
            <img src={plusCircleIcon} alt="" />
            {lang.userSetup}
          </button>
        </div>
      )}
      {formStep === 3 && (
        <div>
          <form
            action="/submit-form"
            method="POST"
            className="starter-screen_step-three"
            onSubmit={(e) => {
              e.preventDefault();
              setFormStep(4);
            }}
          >
            <div>{lang.startScreenText3}</div>
            <p>{lang.startScreenText4}</p>
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
                minLength={6}
                maxLength={6}
                pattern="[0-9]+"
                required
                value={userForm.pin}
                onChange={(e) =>
                  setUserForm((oldVal) => ({ ...oldVal, pin: e.target.value }))
                }
              />
            </label>
            <div>
              <button type="button" onClick={() => setFormStep(2)}>
                <img src={arrowLeftIcon} alt="" />
                {lang.back}
              </button>
              <button type="submit">
                <img src={arrowRightIcon} alt="" />
                {lang.next}
              </button>
            </div>
          </form>
        </div>
      )}
      {formStep === 4 && (
        <form
          className="starter-screen_step-four"
          onSubmit={(e) => {
            e.preventDefault();
            setFormStep(5);
          }}
        >
          <p>{lang.chooseAvatar}</p>
          <div className="starter-screen_step-four_avatar-list">
            <input
              type="radio"
              id="avatar1"
              name="avatar"
              value={avatarOne}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar1">
              <img src={avatarOne} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar2"
              name="avatar"
              value={avatarTwo}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar2">
              <img src={avatarTwo} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar3"
              name="avatar"
              value={avatarThree}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar3">
              <img src={avatarThree} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar4"
              name="avatar"
              value={avatarFour}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar4">
              <img src={avatarFour} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar5"
              name="avatar"
              value={avatarFive}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar5">
              <img src={avatarFive} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar6"
              name="avatar"
              value={avatarSix}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar6">
              <img src={avatarSix} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar7"
              name="avatar"
              value={avatarSeven}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar7">
              <img src={avatarSeven} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar8"
              name="avatar"
              value={avatarEight}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar8">
              <img src={avatarEight} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar9"
              name="avatar"
              value={avatarNine}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar9">
              <img src={avatarNine} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar10"
              name="avatar"
              value={avatarTen}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar10">
              <img src={avatarTen} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar11"
              name="avatar"
              value={avatarEleven}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar11">
              <img src={avatarEleven} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar12"
              name="avatar"
              value={avatarTwelve}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar12">
              <img src={avatarTwelve} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar13"
              name="avatar"
              value={avatarThirteen}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar13">
              <img src={avatarThirteen} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar14"
              name="avatar"
              value={avatarFourteen}
              onChange={(e) => handleAvatarChange(e)}
            />
            <label htmlFor="avatar14">
              <img src={avatarFourteen} alt={lang.chooseAvatar} />
            </label>
          </div>
          <div className="starter-screen_step-four_choosed-avatar">
            <p>{lang.yourAvatar}</p>
            <img src={userForm.avatar} alt={lang.yourAvatar} />
          </div>
          <div className="starter-screen_step-four_buttons">
            <button onClick={() => setFormStep(3)}>
              <img src={arrowLeftIcon} alt="" />
              {lang.back}
            </button>
            <button type="submit">
              <img src={arrowRightIcon} alt="" />
              {lang.next}
            </button>
          </div>
        </form>
      )}
      {formStep === 5 && (
        <div className="starter-screen_step-five">
          <div className="starter-screen_step-five_description">
            <p>{lang.finalSummary}</p>
            <p>{lang.finalSummaryDes}</p>

            <p>
              {userForm.name} {userForm.surname}
            </p>
            <p>
              PIN:
              <span
                onMouseOver={() => setShowPin(true)}
                onMouseOut={() => setShowPin(false)}
              >
                {showPin ? userForm.pin : lang.showPin}
              </span>
            </p>
          </div>
          <div className="starter-screen_step-five_avatar">
            <img src={userForm.avatar} alt="user avatar" />
          </div>
          <div className="starter-screen_step-five_buttons">
            <button type="button" onClick={() => setFormStep(4)}>
              <img src={arrowLeftIcon} alt="" />
              {lang.back}
            </button>
            <button
              type="button"
              onClick={() => {
                changeUser(userForm);
                changeStage("loginScreen");
              }}
            >
              <img src={checkIcon} alt="" />
              {lang.submit}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
