export default function IconRadioButton({ onClick, iconUrl, activeIcon }) {
  return (
    <>
      <label
        htmlFor={iconUrl}
        style={{
          outline:
            activeIcon === iconUrl ? "2px solid var(--border-main)" : "none",
        }}
      >
        <img src={iconUrl} alt="icon" />
      </label>
      <input
        hidden
        id={iconUrl}
        type="radio"
        name="icon"
        value={iconUrl}
        onClick={() => {
          onClick(iconUrl);
        }}
      />
    </>
  );
}
