import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface HoverIconButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

const hoverIconButtonStyles: Record<string, CSSProperties> = {
  wrap: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 26,
    height: 26,
    borderRadius: 6,
    border: "1px solid var(--gray-300)",
    background: "var(--gray-100)",
    color: "var(--gray-600)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    transition: "background 0.15s ease-out, color 0.15s ease-out",
  },
  buttonHover: {
    background: "var(--gray-200)",
    color: "var(--gray-800)",
  },
  tooltip: {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: 6,
    padding: "4px 10px",
    borderRadius: 4,
    background: "var(--gray-900)",
    color: "#fff",
    fontSize: 11,
    whiteSpace: "nowrap",
    pointerEvents: "none",
    opacity: 0,
    transform: "translateY(4px)",
    transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
  },
  tooltipVisible: {
    opacity: 1,
    transform: "translateY(0)",
  },
};

const HoverIconButton = ({ icon, label, onClick }: HoverIconButtonProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={hoverIconButtonStyles.wrap}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        style={{
          ...hoverIconButtonStyles.button,
          ...(hover ? hoverIconButtonStyles.buttonHover : {}),
        }}
        onClick={onClick}
      >
        {icon}
      </button>

      <div
        style={{
          ...hoverIconButtonStyles.tooltip,
          ...(hover ? hoverIconButtonStyles.tooltipVisible : {}),
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default HoverIconButton;
