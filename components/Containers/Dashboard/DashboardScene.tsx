"use client";

import { ReactNode } from "react";

interface DashboardSceneProps {
  children: ReactNode;
}

const DashboardScene = (props: DashboardSceneProps) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default DashboardScene;
