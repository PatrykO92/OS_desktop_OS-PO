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

import axios from "axios";

const StartScreen = ({ lang, changeLang, changeUser, changeStage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    avatar: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", userForm.username);
    formData.append("email", userForm.email);
    formData.append("password1", userForm.password1);
    formData.append("password2", userForm.password2);
    formData.append("avatar", userForm.avatar);

    axios
      .post("http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/", formData)
      .then((response) => {
        console.log(typeof response);
        console.log(response);
        response.status === 204 && console.log("Success");
      })
      .catch((error) => console.log("Axios error:", error));
  };

  const handleAvatarChangeImage = (e) => {
    setUserForm((oldVal) => ({
      ...oldVal,
      avatar: e.target.value,
    }));
  };

  const handleAvatarChange = (event) => {
    setUserForm({
      ...userForm,
      avatar: event.target.files[0], // set the avatar to the selected file
    });
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
                value={userForm.username}
                onChange={(e) =>
                  setUserForm((oldVal) => ({
                    ...oldVal,
                    username: e.target.value,
                  }))
                }
                required
              />
            </label>
            <label>
              {lang.surname}:
              <input
                type="email"
                value={userForm.email}
                onChange={(e) =>
                  setUserForm((oldVal) => ({
                    ...oldVal,
                    email: e.target.value,
                  }))
                }
                required
              />
            </label>
            <label>
              {lang.pin}:
              <input
                type="password"
                minLength={8}
                maxLength={12}
                required
                value={userForm.password1}
                onChange={(e) =>
                  setUserForm((oldVal) => ({
                    ...oldVal,
                    password1: e.target.value,
                  }))
                }
              />
              <input
                type="password"
                minLength={8}
                maxLength={12}
                required
                value={userForm.password2}
                onChange={(e) =>
                  setUserForm((oldVal) => ({
                    ...oldVal,
                    password2: e.target.value,
                  }))
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
              onChange={(e) => handleAvatarChangeImage(e)}
            />
            <label htmlFor="avatar1">
              <img src={avatarOne} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar2"
              name="avatar"
              value={avatarTwo}
              onChange={(e) => handleAvatarChangeImage(e)}
            />
            <label htmlFor="avatar2">
              <img src={avatarTwo} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar3"
              name="avatar"
              value={avatarThree}
              onChange={(e) => handleAvatarChangeImage(e)}
            />
            <label htmlFor="avatar3">
              <img src={avatarThree} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar4"
              name="avatar"
              value={avatarFour}
              onChange={(e) => handleAvatarChangeImage(e)}
            />
            <label htmlFor="avatar4">
              <img src={avatarFour} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar5"
              name="avatar"
              value={avatarFive}
              onChange={(e) => handleAvatarChangeImage(e)}
            />
            <label htmlFor="avatar5">
              <img src={avatarFive} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar6"
              name="avatar"
              value={avatarSix}
              onChange={(e) => handleAvatarChangeImage(e)}
            />
            <label htmlFor="avatar6">
              <img src={avatarSix} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar7"
              name="avatar"
              value={avatarSeven}
              onChange={(e) => handleAvatarChangeImage(e)}
            />
            <label htmlFor="avatar7">
              <img src={avatarSeven} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar8"
              name="avatar"
              value={avatarEight}
              onChange={(e) => handleAvatarChangeImage(e)}
            />
            <label htmlFor="avatar8">
              <img src={avatarEight} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar9"
              name="avatar"
              value={avatarNine}
              onChange={(e) => handleAvatarChangeImage(e)}
            />
            <label htmlFor="avatar9">
              <img src={avatarNine} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar10"
              name="avatar"
              value={avatarTen}
              onChange={(e) => handleAvatarChangeImage(e)}
            />
            <label htmlFor="avatar10">
              <img src={avatarTen} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar11"
              name="avatar"
              value={avatarEleven}
              onChange={(e) => handleAvatarChangeImage(e)}
            />
            <label htmlFor="avatar11">
              <img src={avatarEleven} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar12"
              name="avatar"
              value={avatarTwelve}
              onChange={(e) => handleAvatarChangeImage(e)}
            />
            <label htmlFor="avatar12">
              <img src={avatarTwelve} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar13"
              name="avatar"
              value={avatarThirteen}
              onChange={(e) => handleAvatarChangeImage(e)}
            />
            <label htmlFor="avatar13">
              <img src={avatarThirteen} alt={lang.chooseAvatar} />
            </label>
            <input
              type="radio"
              id="avatar14"
              name="avatar"
              value={avatarFourteen}
              onChange={(e) => handleAvatarChangeImage(e)}
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
                onMouseOver={() => setShowPassword(true)}
                onMouseOut={() => setShowPassword(false)}
              >
                {showPassword ? userForm.pin : lang.showPassword}
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
