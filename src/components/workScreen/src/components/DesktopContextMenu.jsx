import React from "react";
import "../assets/styles/desktopContextMenu.css";

const DesktopContextMenu = ({ position, onClick }) => (
  <div
    id="desktop-context-menu"
    style={{ top: position.y, left: position.x }}
    onClick={onClick}
  >
    <button>
      <p>®</p>
      <p>Option 1</p>
    </button>
    <button>
      <p>®</p>
      <p>Option 2</p>
    </button>
    <button>
      <p>®</p>
      <p>Option 3</p>
    </button>
    <button>
      <p>®</p>
      <p>Option 4</p>
    </button>
  </div>
);

export default DesktopContextMenu;
