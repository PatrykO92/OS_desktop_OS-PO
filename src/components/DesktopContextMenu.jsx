import "../assets/styles/desktopContextMenu.css";

import {
  brushIcon,
  desktopIcon,
  refreshIcon,
  xmarkIcon,
} from "../assets/icons";

const DesktopContextMenu = ({ lang, position, onClick }) => (
  <div
    id="desktop-context-menu"
    style={{ top: position.y, left: position.x }}
    onClick={onClick}
  >
    <button>
      <p>
        <img src={desktopIcon} alt={lang.view} />
      </p>
      <p>{lang.view}</p>
    </button>
    <button>
      <p>
        <img src={brushIcon} alt={lang.personalize} />
      </p>
      <p>{lang.personalize}</p>
    </button>
    <button>
      <p>
        <img src={refreshIcon} alt={lang.refresh} />
      </p>
      <p>{lang.refresh}</p>
    </button>
    <button>
      <p>
        <img src={xmarkIcon} alt={lang.closeAll} />
      </p>
      <p>{lang.closeAll}</p>
    </button>
  </div>
);

export default DesktopContextMenu;
