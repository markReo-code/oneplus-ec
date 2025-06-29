"use client";

import { useRef } from "react";
import { useFocusTrap } from "@/app/_hooks/useFocusTrap";
import styles from "./index.module.css"

type Props = {
    isActive: boolean;
    children: React.ReactNode;
}

export default function FocusTrapWrapper({isActive, children}: Props) {
    const drawerTrapRef = useRef<HTMLDivElement>(null);
    useFocusTrap(drawerTrapRef, isActive);

    return (
        <div ref={drawerTrapRef} className={styles.drawerWrapper}>
            {children}
        </div>
    )
}