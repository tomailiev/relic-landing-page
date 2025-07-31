import { useState, useRef, useEffect } from "react";
import HeaderHeightContext from "../../context/HeatherHeightContext";


export const HeaderHeightProvider = ({ children }) => {
    const [height, setHeight] = useState(0);
    const ref = useRef();

    useEffect(() => {
        if (!ref.current) return;
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                setHeight(entry.contentRect.height);
            }
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <HeaderHeightContext.Provider value={{ headerHeight: height, ref }}>
            {children}
        </HeaderHeightContext.Provider>
    );
};
