import {RefObject, useEffect} from "react";

function useOutsideClick (ref: RefObject<HTMLElement>, onClickOutside: () => void) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [ref, useOutsideClick]);
}

export default useOutsideClick;