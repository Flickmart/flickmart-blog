export const getHostUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side
    return window.location.origin;
  }
  // Server-side
  return process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
};
