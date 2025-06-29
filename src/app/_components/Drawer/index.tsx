"use client";

import { useState } from "react";
import FocusTrapWrapper from "./FocusTrapWrapper";
import DrawerButton from "./DrawerButton";
import DrawerMenu from "./DrawerMenu";
import { useResetDrawer } from "@/app/_hooks/useResetDrawer";
import { useResetOnResize } from "@/app/_hooks/useResetOnResize";
import { useScrollLock } from "@/app/_hooks/useScrollLock";
import { useEscapeToClose } from "@/app/_hooks/useEscapeToClose";

export default function Drawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);

  useResetDrawer(setIsDrawerOpen, setActiveDropdownIndex);
  useResetOnResize({setIsDrawerOpen, setActiveDropdownIndex});
  useEscapeToClose({isDrawerOpen, setIsDrawerOpen});

  useScrollLock(isDrawerOpen);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => {
      const next = !prev;
      if (!next) {
        setActiveDropdownIndex(null);
      }
      return next;
    });
  };

  const closeMenu = () => {
    setIsDrawerOpen(false);
    setActiveDropdownIndex(null);
  };

  return (
    <FocusTrapWrapper isActive={isDrawerOpen}>
      <DrawerButton isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <DrawerMenu
        isDrawerOpen={isDrawerOpen}
        closeMenu={closeMenu}
        activeDropdownIndex={activeDropdownIndex}
        setActiveDropdownIndex={setActiveDropdownIndex}
      />
    </FocusTrapWrapper>
  );
}
