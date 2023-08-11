import styles from "../assets/styles/personalizeUser.module.css";

import { useState } from "react";

import { CSSTransition } from "react-transition-group";

import axiosInstance from "../utils/axiosInstance";
import getUserDetail from "../utils/getUserDetail";
import { LoadingSpinnerFullscreen } from "./LoadingSpinner";

const PersonalizeUser = ({ user, changeUser, lang }) => {
  const [isLoading, setIsLoading] = useState(false);
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
  });
  const [avatarFile, setAvatarFile] = useState("");

  const userTag =
    userForm.name.slice(0, 3).toUpperCase() +
    "_" +
    userForm.lastName.slice(0, 3).toUpperCase();

  const [showAvatarChange, setShowAvatarChange] = useState(false);

  const [pin, setPIN] = useState({ pin1: "", pin2: "", currentPIN: "" });
  const [showPINChange, setShowPINChange] = useState(false);

  const changeUserName = async () => {
    setIsLoading(true);
    const updatedData = {
      first_name: userForm.name,
      last_name: userForm.lastName,
      user_tag: userTag,
    };

    try {
      const response = await axiosInstance.patch(
        "/api/v1/dj-rest-auth/user/",
        updatedData
      );
      console.log("Updated data:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeUserPin = async () => {
    setIsLoading(true);
    const updatedData = {
      pin: pin.pin2,
    };

    try {
      const response = await axiosInstance.patch(
        "/api/v1/dj-rest-auth/user/",
        updatedData
      );
      console.log("Updated data:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeUserAvatar = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const response = await axiosInstance.patch(
        "/api/v1/dj-rest-auth/user/",
        formData
      );
      console.log("Updated data:", response);
      return true;
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="personalize-user" className={styles.window}>
      {isLoading && <LoadingSpinnerFullscreen />}
      {showModal.modal && (
        <div className={styles.modal}>
          <span style={{ color: modalColorFont }}>{showModal.msg}</span>
        </div>
      )}
      <div className={styles.avatar}>
        <img src={user.avatar} alt={lang.yourAvatar} />
        <p>
          <span>{user.name} </span>
          <span>{user.lastName}</span>
        </p>
        <span>({user.userTag})</span>
      </div>

      <div className={styles.menu}>
        <button
          onClick={() => {
            setShowAvatarChange(false);
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
              setShowAvatarChange((oldVal) => !oldVal);
            }, 200);
          }}
        >
          {lang.changeAvatar}
        </button>

        <button
          onClick={() => {
            setShowUserForm(false);
            setShowAvatarChange(false);
            setTimeout(() => {
              setShowPINChange((oldVal) => !oldVal);
            }, 200);
          }}
        >
          {user.pin === "" ? lang.setUpPIN : lang.changePIN}
        </button>
      </div>

      <CSSTransition
        in={showAvatarChange}
        classNames="personalize-user"
        timeout={200}
        unmountOnExit
      >
        <form
          className={styles.avatarChange}
          onSubmit={async (e) => {
            e.preventDefault();
            if (await changeUserAvatar()) changeUser(await getUserDetail());
            setShowAvatarChange(false);
            modalHandler(true, false, lang.success);
          }}
        >
          <label htmlFor="avatar_change">Change Avatar</label>
          <input
            required
            type="file"
            id="avatar_change"
            name="avatar"
            onChange={(e) => setAvatarFile(e.target.files[0])}
          />
          <button type="submit">{lang.submit}</button>
        </form>
      </CSSTransition>

      <CSSTransition
        in={showPINChange}
        classNames="personalize-user"
        timeout={200}
        unmountOnExit
      >
        <form
          className={styles.pin}
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
            changeUserPin();
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
        <div className={styles.name}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              changeUserName();
              changeUser((oldVal) => ({ ...oldVal, ...userForm, userTag }));
              setUserForm({
                name: "",
                lastName: "",
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
                minLength={3}
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
              <label htmlFor="user_last_name">{lang.lastName}:</label>
              <input
                id="user_last_name"
                type="text"
                minLength={3}
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
            <button type="submit">{lang.submit}</button>
          </form>
        </div>
      </CSSTransition>
    </div>
  );
};

export default PersonalizeUser;
