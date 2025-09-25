"use client";

import { SessionProvider } from "next-auth/react";

export function ProvidersSession({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
