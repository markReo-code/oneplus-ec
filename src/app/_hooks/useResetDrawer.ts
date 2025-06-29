import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useResetDrawer(
  setIsDrawerOpen: (val: boolean) => void, 
  setActiveDropdownIndex: (index: number | null) => void,
) {
  const pathname = usePathname();

  useEffect(() => {
    setIsDrawerOpen(false);
    setActiveDropdownIndex(null);
  
  }, [pathname, setIsDrawerOpen, setActiveDropdownIndex]);
}
