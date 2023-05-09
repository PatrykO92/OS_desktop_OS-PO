import "./src/styles/startScreen.css";

import {
  StartScreenStepOne,
  StartScreenStepTwo,
  StartScreenStepThree,
} from "./src/components";

import { arrowLeftIcon, checkIcon, arrowRightIcon } from "../../assets/icons";

// prettier-ignore
import {
  avatarOne, avatarTwo, avatarThree, avatarFour, avatarFive, 
  avatarSix, avatarSeven, avatarEight, avatarNine, avatarTen, avatarEleven, avatarTwelve, avatarThirteen, avatarFourteen
} from "../../assets/images/avatar-images";

import { useState } from "react";

const StartScreen = ({ lang, changeLang, changeUser, changeStage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const changeFormStep = (val) => {
    setFormStep(val);
  };

  const handleAvatarChangeImage = (e) => {
    console.log(e.target.value);
  };

  const handleAvatarChange = (event) => {
    console.log(event.target.files[0]);
  };

  return (
    <div className="start-screen">
      {formStep === 1 && (
        <StartScreenStepOne
          lang={lang}
          changeLang={changeLang}
          changeFormStep={changeFormStep}
        />
      )}

      {formStep === 2 && (
        <StartScreenStepTwo
          lang={lang}
          changeFormStep={changeFormStep}
          changeStage={changeStage}
        />
      )}
      {formStep === 3 && (
        <StartScreenStepThree lang={lang} changeFormStep={changeFormStep} />
      )}
      {formStep === 4 && (
        <form
          className="start-screen_step-four"
          onSubmit={(e) => {
            e.preventDefault();
            setFormStep(5);
          }}
        >
          <p>{lang.chooseAvatar}</p>
          <div className="start-screen_step-four_avatar-list">
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
          <div className="start-screen_step-four_choosed-avatar">
            <p>{lang.yourAvatar}</p>
            {/* <img src={userForm.avatar} alt={lang.yourAvatar} /> */}
          </div>
          <div className="start-screen_step-four_buttons">
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
        <></>
        // <div className="start-screen_step-five">
        //   <div className="start-screen_step-five_description">
        //     <p>{lang.finalSummary}</p>
        //     <p>{lang.finalSummaryDes}</p>

        //     <p>
        //       {userForm.name} {userForm.surname}
        //     </p>
        //     <p>
        //       PIN:
        //       <span
        //         onMouseOver={() => setShowPassword(true)}
        //         onMouseOut={() => setShowPassword(false)}
        //       >
        //         {showPassword ? userForm.pin : lang.showPassword}
        //       </span>
        //     </p>
        //   </div>
        //   <div className="start-screen_step-five_avatar">
        //     <img src={userForm.avatar} alt="user avatar" />
        //   </div>
        //   <div className="start-screen_step-five_buttons">
        //     <button type="button" onClick={() => setFormStep(4)}>
        //       <img src={arrowLeftIcon} alt="" />
        //       {lang.back}
        //     </button>
        //     <button
        //       type="button"
        //       onClick={() => {
        //         changeUser(userForm);
        //         changeStage("loginScreen");
        //       }}
        //     >
        //       <img src={checkIcon} alt="" />
        //       {lang.submit}
        //     </button>
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default StartScreen;
