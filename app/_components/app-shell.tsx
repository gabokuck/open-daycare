import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";

interface AppShellProps {
  children: ReactNode;
  contentMaxWidth?: number | string;
}

export function AppShell({ children, contentMaxWidth = 760 }: AppShellProps) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F6ECDF",
      }}
    >
      <Sidebar />
      <main
        style={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            maxWidth: `${contentMaxWidth}px`,
            width: "100%",
            margin: "0 auto",
            padding: "34px 40px 80px",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
