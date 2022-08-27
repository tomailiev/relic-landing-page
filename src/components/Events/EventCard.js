import { useTheme } from "@emotion/react";
import { Card, CardActionArea, CardMedia, Skeleton, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getLink } from "../../utils/firebase/firestore-funcs";

const EventCard = ({ imageUrl }) => {

    const theme = useTheme();
    const matchesSm = useMediaQuery(theme.breakpoints.down('md'));
    const matchesXs = useMediaQuery(theme.breakpoints.down('sm'));

    const [src, setSrc] = useState(null);
    const [imgLoaded, setImgLoaded] = useState(false);
    useEffect(() => {
        getLink(imageUrl)
            .then(val => setSrc(val))
            .catch(console.error);
    }, [imageUrl]);

    return (
        <Card raised>
            <CardActionArea>
                <div style={{ maxHeight: 800, minWidth: 250, display: 'flex', justifyContent: 'center', background: '#d7d4cf' }}>
                    {!imgLoaded && <Skeleton variant="rectangular" width='100%' height={matchesXs ? 250 : matchesSm ? 600 : 400} />}
                    <CardMedia
                        component="img"
                        // height="300"
                        width={'auto'}
                        image={src}
                        alt="event picture"
                        sx={!imgLoaded ? { width: 0, height: 0 } : { width: 'auto', maxHeight: '100%', maxWidth: '100%' }}
                        onLoad={() => setImgLoaded(true)}
                    />
                </div>
            </CardActionArea>
        </Card>
    )
};
export default EventCard;