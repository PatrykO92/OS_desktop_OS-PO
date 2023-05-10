import { arrowLeftIcon, arrowRightIcon } from "../../../../assets/icons";

import { useEffect, useState } from "react";

const StartScreenStepThree = ({
  lang,
  changeStartScreenStep,
  userForm,
  setUserForm,
}) => {
  const [showError, setShowError] = useState({ error: false, message: "" });

  useEffect(() => {
    if (showError.error) {
      setTimeout(() => {
        setShowError({ error: false, message: "" });
      }, 1500);
    }
  }, [showError]);

  const validatePassword = (userForm) => {
    const { password1, password2 } = userForm;

    // Check if the two password inputs match
    if (password1 !== password2) {
      return { error: true, message: "Passwords do not match" };
    }

    // Check if the password meets certain criteria (e.g., minimum length)
    if (password1.length < 8) {
      return {
        error: true,
        message: "Password must be at least 8 characters long",
      };
    }

    // Check if the password is a commonly used password
    const commonPasswords = [
      "123456",
      "password",
      "123456789",
      "12345678",
      "12345",
      "1234567",
      "1234567890",
      "1234",
      "qwerty",
      "abc123",
    ];
    if (commonPasswords.includes(password1.toLowerCase())) {
      return { error: true, message: "Password is commonly used" };
    }

    // Check if the password is entirely numeric
    if (/^\d+$/.test(password1)) {
      return { error: true, message: "Password can't be entirely numeric" };
    }

    // If the password passes all checks, return error = false
    return { error: false };
  };

  return (
    <div>
      {showError.error ? (
        <div className="start-screen_step-three_error">{showError.message}</div>
      ) : (
        ""
      )}
      <form
        className="start-screen_step-three"
        onSubmit={(e) => {
          e.preventDefault();
          const { error, message } = validatePassword(userForm);
          if (error) {
            setShowError({ error: true, message });
          } else {
            changeStartScreenStep(4);
          }
        }}
      >
        <div>{lang.startScreenText3}</div>
        <p>{lang.startScreenText4}</p>
        <label>
          {lang.email}:
          <input
            type="email"
            value={userForm.email}
            onChange={(e) =>
              setUserForm((oldVal) => ({
                ...oldVal,
                email: e.target.value,
              }))
            }
          />
        </label>
        <label>
          {lang.password1}:
          <input
            type="password"
            value={userForm.password1}
            onChange={(e) =>
              setUserForm((oldVal) => ({
                ...oldVal,
                password1: e.target.value,
              }))
            }
          />
        </label>
        <label>
          {lang.password2}:
          <input
            type="password"
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
          <button type="button" onClick={() => changeStartScreenStep(2)}>
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
  );
};

export default StartScreenStepThree;
