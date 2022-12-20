import { useEffect, useState } from "react";

const useDimensions = () => {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth !== dimensions.width) {
                setDimensions({
                    height: window.innerHeight,
                    width: window.innerWidth
                });
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    return dimensions;
}

export default useDimensions;