import { useTheme } from "@emotion/react";
import { Button, Collapse, Divider, Grid, Paper, Typography, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect } from "react";
import { useState } from "react";
import { getLink } from "../../utils/firebase/firestore-funcs";
import MemberPic from "./MemberPic";

const Bio = ({ picRight, name, bio, picUrl }) => {
    const theme = useTheme();
    const xsMatch = useMediaQuery(theme.breakpoints.down('md'));
    const [isFullBioOpen, setIsFullBioOpen] = useState(false);
    const [src, setSrc] = useState(null);

    useEffect(() => {
        getLink(picUrl)
            .then(val => setSrc(val))
            .catch(console.error);
    }, [picUrl]);

    function toggleFullBio() {
        setIsFullBioOpen(!isFullBioOpen);
    }

    return (
        <>
            <Divider />
            <Box textAlign={'left'} sx={{ my: 5 }}>
                <Paper>
                    <Grid container spacing={2} justifyContent={'center'}>
                        {(!picRight || xsMatch) && <MemberPic src={src} />}
                        <Grid item md={6} xs={12} m={xsMatch && 5} textAlign={!picRight && !xsMatch ? 'right' : 'left'}>
                            <Collapse collapsedSize={330} in={isFullBioOpen}>
                                <Typography component={'span'} fontSize={18} fontWeight="bold" >{name}</Typography>
                                <Typography component={'span'} fontSize={18}>
                                    {bio}
                                </Typography>
                            </Collapse>
                            <Button sx={{ justifySelf: 'center', my: 1 }} variant="contained" color="secondary" onClick={toggleFullBio}>Read {isFullBioOpen ? 'less' : 'more'}</Button>
                        </Grid>
                        {(!!picRight && !xsMatch) && <MemberPic src={src} />}
                    </Grid>
                </Paper>
            </Box>
        </>
    );
};

export default Bio;