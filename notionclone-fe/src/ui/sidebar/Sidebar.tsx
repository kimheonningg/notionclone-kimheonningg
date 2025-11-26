import { useState } from "react";
import type { CSSProperties } from "react";

import {
  KeyboardDoubleArrowLeft,
  EditOutlined,
  HelpOutline,
  Inventory2Outlined,
} from "@mui/icons-material";

import { SIDEBAR_SECTIONS } from "../../constants/sidebar";
import SidebarItemRow from "./SidebarItemRow";
import HoverIconButton from "./HoverIconButton";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeId?: string;
  onItemClick?: (id: string) => void;
}

const sidebarStyles: Record<string, CSSProperties> = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    minHeight: "100vh",
    padding: "12px 10px 12px 12px",
    background: "var(--gray-100)",
    borderRight: "1px solid var(--gray-300)",
    fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    fontSize: 14,
    color: "var(--gray-700)",
    boxSizing: "border-box",
    overflow: "hidden",
    transition:
      "width 0.2s ease-out, padding 0.2s ease-out, border-right 0.2s ease-out",
  },
  workspace: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "4px 6px 10px",
    marginBottom: 4,
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 6,
    background: "var(--gray-900)",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  workspaceMain: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  workspaceName: {
    fontSize: 13,
    fontWeight: 600,
    color: "var(--gray-900)",
  },
  workspaceSub: {
    fontSize: 11,
    color: "var(--gray-500)",
  },
  workspaceActions: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: "var(--gray-500)",
  },

  toggleButton: {
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
    transition: "background 0.15s ease-out, color 0.15s ease-out",
  },

  toggleButtonHover: {
    background: "var(--gray-200)",
    color: "var(--gray-800)",
  },

  section: { marginTop: 8 },
  sectionLabel: {
    padding: "12px 6px 4px",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "var(--gray-500)",
  },
  itemList: { listStyle: "none", padding: 0, margin: 0 },
  bottom: {
    marginTop: "auto",
    paddingTop: 12,
    borderTop: "1px solid var(--gray-300)",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "var(--gray-500)",
  },
  bottomIcon: {
    width: 22,
    height: 22,
    borderRadius: 999,
    border: "1px solid var(--gray-300)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const Sidebar = ({
  collapsed,
  onToggle,
  activeId,
  onItemClick,
}: SidebarProps) => {
  return (
    <aside
      style={{
        ...sidebarStyles.wrap,
        width: collapsed ? 0 : 300,
        padding: collapsed ? 0 : "12px 10px 12px 12px",
        borderRight: collapsed ? "none" : "1px solid var(--gray-300)",
      }}
    >
      {!collapsed && (
        <>
          <header style={sidebarStyles.workspace}>
            <div style={sidebarStyles.avatar}>김</div>

            <div style={sidebarStyles.workspaceMain}>
              <div style={sidebarStyles.workspaceName}>
                김희원님의 워크스페이스
              </div>
              <div style={sidebarStyles.workspaceSub}>개인 · 무료 플랜</div>
            </div>

            <div style={sidebarStyles.workspaceActions}>
              <HoverIconButton
                icon={<KeyboardDoubleArrowLeft fontSize="small" />}
                label="사이드바 닫기"
                onClick={onToggle}
              />
              <HoverIconButton
                icon={<EditOutlined fontSize="small" />}
                label="새 페이지 만들기"
              />
            </div>
          </header>

          {SIDEBAR_SECTIONS.map((section) => (
            <section key={section.id} style={sidebarStyles.section}>
              {section.label && (
                <div style={sidebarStyles.sectionLabel}>{section.label}</div>
              )}

              <ul style={sidebarStyles.itemList}>
                {section.items.map((item) => (
                  <SidebarItemRow
                    key={item.id}
                    item={item}
                    isActive={activeId === item.id}
                    onClick={
                      onItemClick ? () => onItemClick(item.id) : undefined
                    }
                  />
                ))}
              </ul>
            </section>
          ))}

          <div style={sidebarStyles.bottom}>
            <div style={sidebarStyles.bottomIcon}>
              <HelpOutline fontSize="small" />
            </div>
            <div style={sidebarStyles.bottomIcon}>
              <Inventory2Outlined fontSize="small" />
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
