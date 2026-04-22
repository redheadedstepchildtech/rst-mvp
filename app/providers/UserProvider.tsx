"use client";

import { useEffect } from "react";
import { getUserId } from "@/lib/user";

export default function UserProvider({ children }) {
  useEffect(() => {
    const userId = getUserId();

    fetch("/api/user/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
  }, []);

  return children;
}