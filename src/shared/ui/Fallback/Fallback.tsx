import {useEffect, useRef} from 'react';

import logo from "@/shared/assets/svg/logo.svg";
import {classNames} from "@/shared/lib/classNames";

const Fallback = () => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        ref.current?.classList.add("fallback--show");
        ref.current?.classList.remove("fallback--hide");
        return () => {
            setTimeout(() => {
                ref.current?.classList.remove("fallback--show");
                ref.current?.classList.add("fallback--hide");
            }, 500);
        }
    }, [])
    return (
        <>
            <div ref={ref} className={classNames("min-h-screen w-full h-full flex items-center justify-center")}>
                <img src={logo} alt="logo"/>
            </div>
        </>
    );
};

export default Fallback;
