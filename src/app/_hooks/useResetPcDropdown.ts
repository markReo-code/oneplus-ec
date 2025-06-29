import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useResetPcDropdown(
  setPcActiveIndex: (index: number | null) => void,
) {
  const pathname = usePathname();

  useEffect(() => {
   setPcActiveIndex(null)
  
  }, [pathname, setPcActiveIndex]);
}
