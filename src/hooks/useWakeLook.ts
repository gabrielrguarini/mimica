import { useEffect, useState } from "react";

export const useWakeLock = () => {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);
  //Verifica se está em dispositivel movel

  useEffect(() => {
    const requestWakeLock = async () => {
      if (typeof window === "undefined" || !("wakeLock" in navigator)) {
        return null;
      }
      try {
        const wakeLockSentinel = await (navigator as any).wakeLock.request(
          "screen"
        );
        setWakeLock(wakeLockSentinel);

        wakeLockSentinel.addEventListener("release", () => {});
      } catch (err: any) {
        console.error(
          `Failed to obtain wake lock: ${err.name}, ${err.message}`
        );
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLock) {
        wakeLock.release().then(() => {
          setWakeLock(null);
        });
      }
    };
  });

  return wakeLock;
};
