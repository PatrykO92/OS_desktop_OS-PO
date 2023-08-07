export default function IconRadioButton({
  onChange,
  iconUrl,
  activeIcon,
  defaultChecked,
}) {
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
        defaultChecked={defaultChecked}
        id={iconUrl}
        type="radio"
        name="icon"
        value={iconUrl}
        onChange={() => {
          onChange(iconUrl);
        }}
      />
    </>
  );
}
