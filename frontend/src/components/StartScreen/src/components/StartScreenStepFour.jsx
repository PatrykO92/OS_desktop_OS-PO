// prettier-ignore
import {
  avatarOne, avatarTwo, avatarThree, avatarFour, avatarFive, 
  avatarSix, avatarSeven, avatarEight, avatarNine, avatarTen, avatarEleven, avatarTwelve, avatarThirteen, avatarFourteen
} from "../../../../assets/images/avatar-images";
import { arrowLeftIcon, arrowRightIcon } from "../../../../assets/icons";

import { useState } from "react";

const StartScreenStepFour = ({ lang, changeStartScreenStep, setUserForm }) => {
  const [myAvatar, setMyAvatar] = useState(avatarOne);

  const handleAvatarChangeImage = (e) => {
    setMyAvatar(e.target.value);
  };

  return (
    <div className="start-screen_step-four">
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
        <img src={myAvatar} alt={lang.yourAvatar} />
      </div>
      <div className="start-screen_step-four_buttons">
        <button onClick={() => changeStartScreenStep(3)}>
          <img src={arrowLeftIcon} alt="" />
          {lang.back}
        </button>
        <button
          onClick={() => {
            changeStartScreenStep(5);
            setUserForm((oldVal) => ({ ...oldVal, avatar: myAvatar }));
          }}
        >
          <img src={arrowRightIcon} alt="" />
          {lang.next}
        </button>
      </div>
    </div>
  );
};

export default StartScreenStepFour;
