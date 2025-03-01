"use client";

import { getAccount } from "@/actions/auth.action";
import { useRouter } from "next/navigation";
import { useCallback, useLayoutEffect } from "react";

const CheckAuthClient = () => {
  const router = useRouter();
  const checkCurrentAccount = useCallback(async () => {
    const account = await getAccount();
    if (account) {
      //   setUser(account);
      router.refresh();
    } else {
      router.replace("/sign-in");
    }
  }, [router]);

  useLayoutEffect(() => {
    checkCurrentAccount();
  }, [checkCurrentAccount]);
  return <div></div>;
};

export default CheckAuthClient;
