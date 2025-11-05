"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useAutoLogout(dashboardBasePath = "/dashboard") {
  const router = useRouter();
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);

  const logoutNow = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.replace("/auth/login");
  };

  useEffect(() => {
    const prev = prevPathRef.current;

    if (prev !== null) {
      const wasInDashboard = prev.startsWith(dashboardBasePath);
      const nowInDashboard = pathname?.startsWith(dashboardBasePath);

      // se o usuário estava no dashboard e saiu dele → logout
      if (wasInDashboard && !nowInDashboard) {
        logoutNow();
      }
    }

    prevPathRef.current = pathname ?? null;
  }, [pathname]);
}
