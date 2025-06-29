"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useFocusOnRouteChange from "@/app/_hooks/useFocusOnRouteChange";

export function RouteAnnouncer() {
     const [announcement, setAnnouncement] = useState("");
     const pathname = usePathname();

    useFocusOnRouteChange();

     useEffect(() => {
        const title = document.title;
        setAnnouncement(title);
     },[pathname]);

     return (
        <div 
          aria-live="polite"
          aria-atomic="true"
          data-component="RouteAnnouncer"
          style={{
            border: 0,
            clip: "rect(0 0 0 0)",
            width: "1px",
            height: "1px",
            margin: "-1px",
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            whiteSpace: "nowrap",
          }}
        >
            {announcement}
        </div>
     )
}