import { useEffect, useState } from "react";

export const useWakeLock = () => {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        const wakeLockSentinel = await (navigator as any).wakeLock.request(
          "screen"
        );
        setWakeLock(wakeLockSentinel);

        wakeLockSentinel.addEventListener("release", () => {
          console.log("Wake Lock was released");
        });
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
  }, []);

  return wakeLock;
};
