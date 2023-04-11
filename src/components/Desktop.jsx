import "../assets/styles/desktop.css";

const Desktop = ({
  handleStateToDoApp,
  handleStateWebBrowser,
  toDoApp,
  webBrowser,
  calculator,
  handleStateCalculator,
  wallpaper,
}) => {
  return (
    <div className="desktop" style={{ backgroundImage: `url(${wallpaper})` }}>
      <button
        onClick={() => {
          handleStateToDoApp("hidden", false);
          handleStateToDoApp("programEnabled", true);
        }}
        className="desktop_icon"
      >
        <img src={toDoApp.icon} alt={toDoApp.name} />
        <p>{toDoApp.name}</p>
      </button>

      <button
        onClick={() => {
          handleStateWebBrowser("hidden", false);
          handleStateWebBrowser("programEnabled", true);
        }}
        className="desktop_icon"
      >
        <img src={webBrowser.icon} alt={webBrowser.name} />
        <p>{webBrowser.name}</p>
      </button>

      <button
        onClick={() => {
          handleStateCalculator("hidden", false);
          handleStateCalculator("programEnabled", true);
        }}
        className="desktop_icon"
      >
        <img src={calculator.icon} alt={calculator.name} />
        <p>{calculator.name}</p>
      </button>
    </div>
  );
};

export default Desktop;
