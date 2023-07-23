export default function ColorRadioButton({ onClick, color, activeColor }) {
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
        id={`${color}RadioButton`}
        hidden
        type="radio"
        name="color"
        value={"color"}
        onClick={() => {
          onClick(color);
        }}
      />
    </>
  );
}
