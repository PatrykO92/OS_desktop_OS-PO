import { arrowLeftIcon, arrowRightIcon } from "../../../../assets/icons";

import { useState } from "react";

import axios from "axios";

const StartScreenStepThree = ({ lang, changeFormStep }) => {
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

  return (
    <div>
      <form
        action="/submit-form"
        method="POST"
        className="start-screen_step-three"
        onSubmit={(e) => {
          e.preventDefault();
          changeFormStep(4);
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
          <button type="button" onClick={() => changeFormStep(2)}>
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
