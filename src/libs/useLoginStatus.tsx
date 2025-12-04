import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import type { RootState } from "@/src/redux/store";

const useLoginStatus = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loginUser = useSelector((state: RootState) => state.auth.loginUser);
  const [, setCookie]: any = useCookies(["auth"]);

  useEffect(() => {
    if (loginUser?.isLogin === true && loginUser?.data && loginUser?.data?.user) {
      const payload: any = {
        user: {
          id: loginUser?.data?.user?.id,
          firstName: loginUser?.data?.user?.firstName,
          lastName: loginUser?.data?.user?.lastName,
          email: loginUser?.data?.user?.email,
          phone: loginUser?.data?.user?.phone,
          userType: loginUser?.data?.user?.userType,
        },
        accessToken: loginUser?.data?.session?.accessToken,
        session: loginUser?.data?.session,
        org: loginUser?.data?.user?.orgId,
        customer: loginUser?.data?.customer?.id,
      };

      setIsLoading(true);

      // Mirror svastha: set cookie based on rememberMe preference
      // If rememberMe is true, set persistent cookie (30 days)
      // If rememberMe is false or undefined, set session cookie (expires when browser closes)
      const cookieOptions: any = { path: "/" };
      if (loginUser?.rememberMe) {
        cookieOptions.maxAge = 2592000; // 30 days in seconds
      }
      // If rememberMe is false, don't set maxAge (session cookie)

      setCookie("auth", JSON.stringify(payload), cookieOptions);
      setIsLogin(true);
      setIsLoading(false);
    }
  }, [loginUser, setCookie]);

  return { isLogin, isLoading };
};

export default useLoginStatus;

