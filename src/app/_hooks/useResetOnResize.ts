import { useEffect, useRef } from "react"

export function useResetOnResize({
    setPcActiveIndex,
    setActiveDropdownIndex,
    setIsDrawerOpen,
    setFooterNavOpenIndex
}: {
    setPcActiveIndex?: (index: number | null) => void,
    setActiveDropdownIndex?: (index: number | null) => void
    setIsDrawerOpen?: (val: boolean) => void,
    setFooterNavOpenIndex?: (index: number | null) => void
}) {
    const prevWidth = useRef<number | null>(null); 

    useEffect(() => {
        prevWidth.current = window.innerWidth;

        const handleResize = () => {
            const width = window.innerWidth; 
            const prev = prevWidth.current ?? width;

            //PC →  SP
            if (prev >= 1025 && width < 1025) {
                setPcActiveIndex?.(null);
            }

            //SP →  PC
            if (prev <= 768 && width >= 769) {
                setFooterNavOpenIndex?.(null);
            }

            //SP →  PC
            if (prev <= 1024 && width >= 1025) {
                setIsDrawerOpen?.(false);
                setActiveDropdownIndex?.(null);
            }

            prevWidth.current = width;
        }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
        
    },[setPcActiveIndex, setActiveDropdownIndex, setIsDrawerOpen, setFooterNavOpenIndex]);
}