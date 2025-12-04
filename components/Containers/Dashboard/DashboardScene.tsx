"use client";

import { ReactNode } from "react";

interface DashboardSceneProps {
  children: ReactNode;
}

export function DashboardScene(props: DashboardSceneProps) {
  const { children } = props;
  return <div>{children}</div>;
}
