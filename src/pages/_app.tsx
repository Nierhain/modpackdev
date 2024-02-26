import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { api } from "@/utils/api";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component
        {...pageProps}
        className={`${GeistSans.variable} ${GeistMono.variable}`}
      />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
