import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useNoDropdownTransition() {
    const [noTransition, setNoTransition] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setNoTransition(true);

        const timeout = setTimeout(() => {
            setNoTransition(false);
        },0);

         return () => clearTimeout(timeout); 

    },[pathname]);

    return noTransition;
}