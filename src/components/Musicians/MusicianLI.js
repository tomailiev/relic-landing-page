import { Box, Button, Link, Paper, Skeleton, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DialogContext from "../../context/DialogContext";
import { getLink } from "../../utils/firebase/firestore-funcs";
import MusicianDialog from "./MusicianDialog";
// import MusicianSkeleton from "./MusicianSkeleton";

const MusicianLI = ({ name, picUrl, bio, id, chair, title }) => {
    const { setDialog } = useContext(DialogContext);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [src, setSrc] = useState(null);

    useEffect(() => {
        getLink(picUrl)
            .then(val => setSrc(val))
            .catch(console.error);
    }, [picUrl]);

    return (
        <Link
            onClick={() => setDialog({ type: 'bio', component: <MusicianDialog name={name} src={src} bio={bio} />, title: name })}
            color="inherit"
            style={{
                transition: '0.3s',
                '&:hover': { opacity: 0.95 },
                textDecoration: 'none'
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // alignItems: 'stretch',
                    borderRadius: 3,
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                        backgroundColor: '#ffffff'
                    },
                }}
            >
                {/* Image */}
                <Box
                    sx={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '1 / 1',
                        flexShrink: 0,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        mb: 2,
                        backgroundColor: '#eee',
                        position: 'relative',
                    }}
                >
                    {!imgLoaded && (
                        <Skeleton
                            variant="rectangular"
                            animation="wave"
                            sx={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            }}
                        />
                    )}
                    {src && (
                        <img
                            src={src}
                            alt={name}
                            onLoad={() => setImgLoaded(true)}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: imgLoaded ? 'block' : 'none',
                            }}
                        />
                    )}
                </Box>

                {/* Text content */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        
                    }}
                >
                    <Box>
                        <Typography variant="h6" fontWeight={600}>
                            {name}, {title}
                        </Typography>
                        {chair && <Typography variant="body1" fontWeight={'600'} fontStyle={'italic'} sx={{ mt: 1 }}>
                            The {chair}
                        </Typography>}

                        {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {title}
                            </Typography> */}


                    </Box>

                    <Box>
                        <Button variant="contained" color="primary" sx={{ my: 1 }}>
                            View
                        </Button>
                    </Box>
                </Box>
            </Paper>
            {/* </ListItem> */}
        </Link>
    )
};

export default MusicianLI;