"use client";

import { getAccount } from "@/actions/auth.action";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useLayoutEffect } from "react";

const CheckAuthClient = () => {
  const router = useRouter();
  const checkCurrentAccount = useCallback(async () => {
    const account = await getAccount();
    if (account) {
      router.refresh();
    } else {
      router.replace("/sign-in");
    }
  }, [router]);

  useLayoutEffect(() => {
    checkCurrentAccount();
  }, [checkCurrentAccount]);
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <LoaderCircle className="size-20 animate-spin text-primary" />
    </div>
  );
};

export default CheckAuthClient;
