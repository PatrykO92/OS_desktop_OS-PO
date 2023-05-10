import { arrowLeftIcon, checkIcon } from "../../../../assets/icons";

import { useState } from "react";

import axios from "axios";

const StartScreenStepFive = ({
  lang,
  changeStartScreenStep,
  changeStage,
  userForm,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("username", userForm.email);
    formData.append("email", userForm.email);
    formData.append("password1", userForm.password1);
    formData.append("password2", userForm.password2);
    formData.append("avatar", userForm.avatar);

    axios
      .post("http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/", formData)
      .then((response) => {
        if (response.status === 204) {
          changeStage("loginScreen");
        }
      })
      .catch((error) => console.log("Axios error:", error));
  };

  return (
    <div className="start-screen_step-five">
      <div className="start-screen_step-five_description">
        <button onClick={() => console.log(userForm)}>TEST</button>
        <p>{lang.finalSummary}</p>
        <p>{lang.finalSummaryDes}</p>

        <p>{userForm.email}</p>
        <p>
          PIN:
          <span
            onMouseOver={() => setShowPassword(true)}
            onMouseOut={() => setShowPassword(false)}
          >
            {showPassword ? userForm.password1 : lang.showPassword}
          </span>
        </p>
      </div>
      <div className="start-screen_step-five_avatar">
        <img src={userForm.avatar} alt="user avatar" />
      </div>
      <div className="start-screen_step-five_buttons">
        <button type="button" onClick={() => changeStartScreenStep(4)}>
          <img src={arrowLeftIcon} alt="" />
          {lang.back}
        </button>
        <button
          type="button"
          onClick={() => {
            handleSubmit();
            // changeStage("loginScreen");
          }}
        >
          <img src={checkIcon} alt="" />
          {lang.submit}
        </button>
      </div>
    </div>
  );
};

export default StartScreenStepFive;
