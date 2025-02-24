import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="">
        <div className="">Hello World</div>
        {children}
    </div>
  );
}