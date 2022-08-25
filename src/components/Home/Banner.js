import { Box } from "@mui/material";
import { Parallax } from "react-parallax";
import '@fontsource/lato/400-italic.css';
import { banners } from '../../data/banners'
import { useEffect, useState } from "react";
import { getLink } from "../../utils/firebase/firestore-funcs";

const Banner = ({ height, children }) => {

    const [imgSrc, setImgSrc] = useState(banners.homeBanner.placeholder);

    useEffect(() => {
        getLink(banners.homeBanner.url)
            .then(val => {
                const img = new Image();
                img.src = val;
                img.onload = () => setImgSrc(val);
            })
            .catch(console.error);
    }, []);

    return (
        <Parallax
            blur={0}
            strength={150}
            bgImage={imgSrc}
            bgImageAlt=""
            style={imgSrc === banners.homeBanner.placeholder ? { filter: 'blur(10px)', clipPath: 'inset(0)' } : { filter: 'blur(0px)', transition: 'filter 0.3s linear' }}
        >
            <Box width="100%" height={height} display="flex" flexDirection="column" alignItems={"center"} justifyContent={'space-between'}>
                {children}
            </Box>
        </Parallax>
    );
};

export default Banner;