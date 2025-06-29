import { useEffect, useRef } from "react";

const isIOSUserAgent = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  const isIOS =
    ua.includes("iphone") ||
    ua.includes("ipad") ||
    (ua.includes("macintosh") && "ontouchend" in document);

  return isIOS;
};

export const useScrollLock = (shouldLock: boolean) => {
  const scrollYRef = useRef(0);
  const isFirstRender = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    //初回だけスキップ
    if (!isFirstRender.current) {
      isFirstRender.current = true;
      return;
    }

    const body = document.body;
    const html = document.documentElement; //Safari対応
    const IOS = isIOSUserAgent();

    if (shouldLock) {
      scrollYRef.current = window.pageYOffset;

      if (IOS) {
        body.style.position = "fixed";
        body.style.top = `-${scrollYRef.current}px`;
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";
      } else {
        body.style.overflow = "hidden";
        html.style.overflow = "hidden"
      }
    } else {
      if (IOS) {
        body.style.removeProperty("position");
        body.style.removeProperty("top");
        body.style.removeProperty("left");
        body.style.removeProperty("right");
        body.style.removeProperty("width");
        window.scrollTo(0, scrollYRef.current);
      } else {
        body.style.removeProperty("overflow");
        html.style.removeProperty("overflow");
      }
    }
  }, [shouldLock]);
};