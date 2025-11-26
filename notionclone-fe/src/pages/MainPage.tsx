import { useState } from "react";
import type { CSSProperties } from "react";

import Sidebar from "../ui/sidebar/Sidebar";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";

const mainPageStyles: Record<string, CSSProperties> = {
  wrap: {
    display: "flex",
    height: "100vh",
  },
  collapsedButton: {
    position: "fixed",
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 8,
    border: "1px solid var(--gray-300)",
    background: "var(--gray-100)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    background: "var(--gray-50)",
  },
};

const MainPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={mainPageStyles.wrap}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          style={mainPageStyles.collapsedButton}
        >
          <KeyboardDoubleArrowRight fontSize="small" />
        </button>
      )}

      {/* Main Content */}
      <div style={mainPageStyles.content}></div>
    </div>
  );
};

export default MainPage;
