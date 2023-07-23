import { arrowLeftIcon, arrowRightIcon } from "../../../../assets/icons";

const StartScreenStepThree = ({
  lang,
  changeStartScreenStep,
  userForm,
  setUserForm,
}) => {
  return (
    <div>
      <form
        className="start-screen_step-three"
        onSubmit={(e) => {
          e.preventDefault();
          changeStartScreenStep(4);
        }}
      >
        <div>{lang.startScreenText3}</div>
        <p>{lang.startScreenText4}</p>
        <label>
          {lang.name}:
          <input
            required
            type="text"
            value={userForm.name}
            maxLength={16}
            onChange={(e) =>
              setUserForm((oldVal) => ({
                ...oldVal,
                name: e.target.value,
              }))
            }
          />
        </label>
        <label>
          {lang.lastName}:
          <input
            type="text"
            value={userForm.lastName}
            maxLength={16}
            onChange={(e) =>
              setUserForm((oldVal) => ({
                ...oldVal,
                lastName: e.target.value,
              }))
            }
            required
          />
        </label>
        <label>
          {lang.pin}:
          <input
            type="password"
            value={userForm.pin}
            onChange={(e) =>
              setUserForm((oldVal) => ({
                ...oldVal,
                pin: e.target.value,
              }))
            }
            pattern="[0-9]+"
            minLength={6}
            maxLength={6}
            required
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
