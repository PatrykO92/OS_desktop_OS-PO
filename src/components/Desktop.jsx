import "../assets/styles/desktop.css";

const Desktop = ({
  wallpaper,
  // Apps states and handlers
  toDoApp,
  handleStateToDoApp,
  webBrowser,
  handleStateWebBrowser,
  calculator,
  handleStateCalculator,
  tetris,
  handleStateTetris,
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

      <button
        onClick={() => {
          handleStateTetris("hidden", false);
          handleStateTetris("programEnabled", true);
        }}
        className="desktop_icon"
      >
        <img src={tetris.icon} alt={tetris.name} />
        <p>{tetris.name}</p>
      </button>
    </div>
  );
};

export default Desktop;
