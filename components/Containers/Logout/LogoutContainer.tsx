"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

import { logoutAPI } from "@/src/redux/services/auth.api";

export function LogoutContainer() {
  const router = useRouter();
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const [status, setStatus] = useState<"running" | "done">("running");

  useEffect(() => {
    async function performLogout() {
      const auth = cookies.auth;
      const sessionId: string | undefined = auth?.session?.id;

      try {
        if (sessionId) {
          await logoutAPI({ sessionId });
        }
      } catch {
        // Ignore API failures and still clear client state
      } finally {
        // Clear auth cookie using react-cookie
        removeCookie("auth", { path: "/" });
        setStatus("done");
        router.replace("/login");
      }
    }

    void performLogout();
  }, [router, cookies.auth, removeCookie]);

  return null;
}

