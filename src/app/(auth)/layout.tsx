import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="bg-neutral-100 absolute inset-0 flex items-center justify-center w-full">
      <div className="mx-auto max-w-screen-2xl p-4 w-full">
        <div className="flex flex-col items-center justify-center w-full">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
