export default function ColorRadioButton({
  onChange,
  color,
  activeColor,
  defaultChecked,
}) {
  return (
    <>
      <label
        htmlFor={`${color}RadioButton`}
        style={{
          backgroundColor: color,
          outline:
            activeColor === color ? "2px solid var(--border-main)" : "none",
        }}
      ></label>
      <input
        defaultChecked={defaultChecked}
        id={`${color}RadioButton`}
        hidden
        type="radio"
        name="color"
        value={color}
        onChange={() => {
          onChange(color);
        }}
      />
    </>
  );
}
