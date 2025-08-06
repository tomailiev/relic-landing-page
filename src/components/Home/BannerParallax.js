import { Box, Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import HeaderHeightContext from "../../context/HeatherHeightContext";
import Title from "./Title";

const BannerParallax = ({ bgPic }) => {
    const { headerHeight } = useContext(HeaderHeightContext);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Clamp opacity between 0 and 1 as scroll increases
    const fadeOpacity = Math.min(scrollY / 500, 1); // adjust 300 for fade length

    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                top: `-${headerHeight}px`,
                position: 'relative',
                height: '100vh',
                overflow: 'hidden',
                mb: `-${headerHeight}px`,
            }}
        >
            {/* Background Layer with fading black overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${bgPic})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    zIndex: 0,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: `rgba(0, 0, 0, ${fadeOpacity})`,
                        transition: 'background 0.1s ease-out',
                    },
                }}
            />

            {/* Foreground Title */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `translateY(${scrollY * 0.15}px)`,
                    transition: 'transform 0.1s ease-out',
                }}
            >
                <Title />
            </Box>
        </Container>
    );
};

export default BannerParallax;
