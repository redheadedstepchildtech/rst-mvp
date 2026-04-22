"use client";

import { useEffect } from "react";

export default function StoryViewTracker({ id }) {
  useEffect(() => {
    const cookieName = `viewed_${id}`;

    // If cookie exists, do not count again
    if (document.cookie.includes(cookieName)) {
      return;
    }

    // Set session cookie (expires when browser closes)
    document.cookie = `${cookieName}=true; path=/;`;

    // Send analytics event
    fetch("/api/analytics/view", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
  }, [id]);

  return null;
}