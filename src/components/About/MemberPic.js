import { Grid, Skeleton } from "@mui/material"
import { Box } from "@mui/system";
import { useState } from "react";


const MemberPic = ({ src }) => {
    const [hasLoaded, setHasLoaded] = useState(false);

    function toggleImageVisible() {
        setHasLoaded(true);
    }
    return (
        <Grid item md={5} xs={12}>
            <Grid container justifyContent={'center'}>
                <Box overflow={'hidden'} borderRadius="50%" height={'360px'}>
                    {!hasLoaded
                        && <Skeleton variant="rectangular" animation={'wave'} height={400} width={230} />
                    }
                    <img src={src}
                        height="400px"
                        alt="relic founder avatar"
                        style={{ opacity: hasLoaded }}
                        onLoad={toggleImageVisible} />
                </Box>
            </Grid>
        </Grid>
    );
};

export default MemberPic;