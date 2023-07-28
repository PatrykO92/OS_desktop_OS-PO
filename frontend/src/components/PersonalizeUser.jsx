import "../assets/styles/personalizeUser.css";

import { defaultUserIcon } from "../assets/icons";

import { useState } from "react";

import { CSSTransition } from "react-transition-group";

const PersonalizeUser = ({ user, changeUser, lang }) => {
  const [showModal, setShowModal] = useState({ modal: false, msg: "" });
  const [modalColorFont, setModalColorFont] = useState("");

  const modalHandler = (modal, error, msg) => {
    setShowModal({ modal, msg });
    if (error) setModalColorFont("var(--red)");
    if (!error) setModalColorFont("var(--green)");
    setTimeout(() => setShowModal(false, ""), 1500);
  };

  const [showUserForm, setShowUserForm] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "",
    lastName: "",
    userTag: "",
  });

  const [showAvatarList, setShowAvatarList] = useState(false);

  const [pin, setPIN] = useState({ pin1: "", pin2: "", currentPIN: "" });
  const [showPINChange, setShowPINChange] = useState(false);

  const handleAvatarChangeImage = (e) => {
    changeUser((oldVal) => ({ ...oldVal, avatar: e.target.value }));
  };

  return (
    <div id="personalize-user">
      {showModal.modal && (
        <div className="personalize-user__modal">
          <span style={{ color: modalColorFont }}>{showModal.msg}</span>
        </div>
      )}
      <div className="personalize-user__avatar">
        <img src={user.avatar} alt={lang.yourAvatar} />
        <p>
          <span>{user.name} </span>
          <span>{user.lastName}</span>
        </p>
        <span>({user.userTag})</span>
      </div>

      <div className="personalize-user__buttons">
        <button
          onClick={() => {
            setShowAvatarList(false);
            setShowPINChange(false);
            setTimeout(() => {
              setShowUserForm((oldVal) => !oldVal);
            }, 200);
          }}
        >
          {lang.changeName}
        </button>

        <button
          onClick={() => {
            setShowUserForm(false);
            setShowPINChange(false);
            setTimeout(() => {
              setShowAvatarList((oldVal) => !oldVal);
            }, 200);
          }}
        >
          {lang.changeAvatar}
        </button>

        <button
          onClick={() => {
            setShowUserForm(false);
            setShowAvatarList(false);
            setTimeout(() => {
              setShowPINChange((oldVal) => !oldVal);
            }, 200);
          }}
        >
          {user.pin === "" ? lang.setUpPIN : lang.changePIN}
        </button>
      </div>

      <CSSTransition
        in={showAvatarList}
        classNames="personalize-user"
        timeout={200}
        unmountOnExit
      >
        <div className="personalize-user__avatar-list">
          <input
            type="radio"
            id="avatar1"
            name="avatar"
            value={defaultUserIcon}
            onChange={(e) => handleAvatarChangeImage(e)}
          />
        </div>
      </CSSTransition>

      <CSSTransition
        in={showPINChange}
        classNames="personalize-user"
        timeout={200}
        unmountOnExit
      >
        <form
          className="personalize-user__pin"
          onSubmit={(e) => {
            e.preventDefault();

            if (pin.currentPIN !== user.pin) {
              modalHandler(true, true, lang.wrongOldPIN);
              return;
            }

            if (pin.pin1 !== pin.pin2) {
              modalHandler(true, true, lang.samePIN);
              return;
            }

            changeUser((oldVal) => ({ ...oldVal, pin: pin.pin2 }));
            setPIN({ pin1: "", pin2: "", currentPIN: "" });
            modalHandler(true, false, "PIN changed");
            setShowPINChange(false);
          }}
        >
          {user.pin === "" ? (
            <></>
          ) : (
            <>
              <label htmlFor="user_current_pin">{lang.currentPIN}:</label>
              <input
                id="user_current_pin"
                type="password"
                value={pin.currentPIN}
                onChange={(e) =>
                  setPIN((oldVal) => ({
                    ...oldVal,
                    currentPIN: e.target.value,
                  }))
                }
                pattern="[0-9]+"
                minLength={6}
                maxLength={6}
                required
              />
            </>
          )}

          <label htmlFor="user_pin_1">{lang.enterPIN}:</label>
          <input
            id="user_pin_1"
            type="password"
            value={pin.pin1}
            onChange={(e) =>
              setPIN((oldVal) => ({ ...oldVal, pin1: e.target.value }))
            }
            pattern="[0-9]+"
            minLength={6}
            maxLength={6}
            required
          />

          <label htmlFor="user_pin_2">{lang.repeatPIN}:</label>
          <input
            id="user_pin_2"
            type="password"
            value={pin.pin2}
            onChange={(e) =>
              setPIN((oldVal) => ({ ...oldVal, pin2: e.target.value }))
            }
            pattern="[0-9]+"
            minLength={6}
            maxLength={6}
            required
          />
          <button type="submit">{lang.submit}</button>
        </form>
      </CSSTransition>

      <CSSTransition
        in={showUserForm}
        classNames="personalize-user"
        timeout={200}
        unmountOnExit
      >
        <div className="personalize-user__name">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              changeUser((oldVal) => ({ ...oldVal, ...userForm }));
              setUserForm({
                name: "",
                lastName: "",
                userTag: "",
              });
              modalHandler(true, false, lang.success);
              setShowUserForm(false);
            }}
          >
            <p>
              <label htmlFor="user_name">{lang.name}:</label>
              <input
                id="user_name"
                type="text"
                minLength={1}
                maxLength={15}
                value={userForm.name}
                onChange={(e) => {
                  setUserForm((oldVal) => ({
                    ...oldVal,
                    name: e.target.value,
                  }));
                }}
                required
              />
            </p>

            <p>
              <label htmlFor="ser_last_name">{lang.lastName}:</label>
              <input
                id="user_last_name"
                type="text"
                minLength={1}
                maxLength={15}
                value={userForm.lastName}
                onChange={(e) => {
                  setUserForm((oldVal) => ({
                    ...oldVal,
                    lastName: e.target.value,
                  }));
                }}
                required
              />
            </p>
            <p>
              <label htmlFor="user_tag">{lang.userTag}:</label>
              <input
                id="user_tag"
                type="text"
                minLength={3}
                maxLength={6}
                value={userForm.userTag}
                onChange={(e) => {
                  setUserForm((oldVal) => ({
                    ...oldVal,
                    userTag: e.target.value,
                  }));
                }}
                required
              />
            </p>
            <button type="submit">{lang.submit}</button>
          </form>
        </div>
      </CSSTransition>
    </div>
  );
};

export default PersonalizeUser;
