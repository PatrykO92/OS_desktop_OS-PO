import "../assets/styles/personalizeUser.css";

import {
  avatarOne,
  avatarTwo,
  avatarThree,
  avatarFour,
  avatarFive,
  avatarSix,
  avatarSeven,
  avatarEight,
  avatarNine,
  avatarTen,
  avatarEleven,
  avatarTwelve,
  avatarThirteen,
  avatarFourteen,
} from "../assets/images/avatar-images";

import { useState } from "react";

import { CSSTransition } from "react-transition-group";

// name: "Nicolaus",
// lastName: "Copernicus",
// pin: "",
// avatar: avatarOne,
// userTag: "NiCo",

const PersonalizeUser = ({ user, changeUser, lang }) => {
  const [showAvatarList, setShowAvatarList] = useState(false);

  const handleAvatarChangeImage = (e) => {
    changeUser((oldVal) => ({ ...oldVal, avatar: e.target.value }));
  };

  return (
    <div id="personalize-user">
      <div className="personalize-user__avatar">
        <img src={user.avatar} alt={lang.yourAvatar} />
        <button
          onClick={() => {
            setShowAvatarList((oldVal) => !oldVal);
          }}
        >
          {lang.changeAvatar}
        </button>
      </div>

      <CSSTransition
        in={showAvatarList}
        classNames="fade"
        timeout={500}
        unmountOnExit
      >
        <div className="personalize-user__avatar-list">
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
      </CSSTransition>

      <div className="personalize-user__name">
        <p>
          <span>{lang.name}:</span> <span>{user.name}</span>
          <input
            type="text"
            minLength={1}
            maxLength={15}
            value={user.name}
            onChange={(e) => {
              changeUser((oldVal) => ({ ...oldVal, name: e.target.value }));
            }}
          />
        </p>

        <p>
          <span>{lang.lastName}:</span> <span>{user.lastName}</span>
          <input
            type="text"
            minLength={1}
            maxLength={15}
            value={user.lastName}
            onChange={(e) => {
              changeUser((oldVal) => ({ ...oldVal, lastName: e.target.value }));
            }}
          />
        </p>
        <p>
          <span>{lang.userTag}:</span> <span>{user.userTag}</span>
          <input
            type="text"
            minLength={3}
            maxLength={4}
            value={user.userTag}
            onChange={(e) => {
              changeUser((oldVal) => ({ ...oldVal, userTag: e.target.value }));
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default PersonalizeUser;
