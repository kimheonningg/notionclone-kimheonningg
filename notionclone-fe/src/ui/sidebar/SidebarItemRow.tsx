import { useState } from "react";
import type { CSSProperties } from "react";
import type { SidebarItem } from "../../types/sidebar";

interface SidebarItemRowProps {
  item: SidebarItem;
  isActive: boolean;
  onClick?: () => void;
}

const rowStyles: Record<string, CSSProperties> = {
  item: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "4px 6px",
    margin: "1px 0",
    borderRadius: 6,
    cursor: "pointer",
    color: "var(--gray-700)",
    userSelect: "none",
  },
  itemHover: {
    background: "var(--gray-200)",
  },
  itemActive: {
    background: "var(--gray-50)",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.04)",
  },
  icon: {
    width: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
  },
  label: {
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  badge: {
    padding: "0 6px",
    borderRadius: 999,
    fontSize: 10,
    fontWeight: 600,
    background: "var(--pink-50)",
    color: "var(--pink-600)",
  },
};

const SidebarItemRow = ({ item, isActive, onClick }: SidebarItemRowProps) => {
  const [hover, setHover] = useState(false);

  return (
    <li
      style={{
        ...rowStyles.item,
        ...(hover ? rowStyles.itemHover : {}),
        ...(isActive ? rowStyles.itemActive : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {item.icon && <span style={rowStyles.icon}>{item.icon}</span>}
      <span style={rowStyles.label}>{item.label}</span>

      {item.badge && <span style={rowStyles.badge}>{item.badge}</span>}
    </li>
  );
};

export default SidebarItemRow;
