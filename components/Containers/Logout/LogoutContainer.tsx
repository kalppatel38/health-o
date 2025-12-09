"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

import { logoutAPI } from "@/src/redux/services/auth.api";
import { fetchLoginUserReset, loginReset } from "@/src/redux/slices/auth";
import type { AppDispatch } from "@/src/redux/store";

const LogoutContainer = () => {
  const router = useRouter();
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const dispatch = useDispatch<AppDispatch>();
  const hasLoggedOutRef = useRef(false);

  useEffect(() => {
    if (hasLoggedOutRef.current) return;
    hasLoggedOutRef.current = true;

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
        // Reset auth state in Redux
        dispatch(loginReset());
        dispatch(fetchLoginUserReset());
        router.replace("/login");
      }
    }

    void performLogout();
  }, [cookies.auth, dispatch, removeCookie, router]);

  return null;
};

export default LogoutContainer;

