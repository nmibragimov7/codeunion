import {useCallback, useRef} from "react";

interface Props {
    cb: (args: any[]) => void;
    delay: number;
}

export const useDebounce = ({cb, delay}: Props) => {
    const timer = useRef<any>();
    return useCallback((...args: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(async () => {
            // @ts-ignore
            await cb(...args);
        }, delay);
    }, [timer, cb, delay]);
}
