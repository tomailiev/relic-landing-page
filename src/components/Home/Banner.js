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
            blur={imgSrc === banners.homeBanner.placeholder ? 10 : 0}
            strength={150}
            bgImage={imgSrc}
            bgImageAlt=""
        >
            <Box width="100%" height={height} display="flex" flexDirection="column" alignItems={"center"} justifyContent={'space-between'}>
                {children}
            </Box>
        </Parallax>
    );
};

export default Banner;