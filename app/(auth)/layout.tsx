"use client";

import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-[#e9f1ff]">
      <main className="flex-1 flex items-center justify-center px-4">
        {children}
      </main>
    </div>
  );
}


