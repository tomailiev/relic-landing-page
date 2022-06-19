import { Grid, Skeleton } from "@mui/material"
import { Box } from "@mui/system";


const MemberPic = ({ src }) => {
    return (
        <Grid item md={5} xs={12}>
            <Grid container justifyContent={'center'}>
                <Box overflow={'hidden'} borderRadius="50%" height={'360px'}>
                    {src
                        ? <img src={src} height="400px" alt="relic founder avatar" />
                        : <Skeleton variant="rectangular" height={400} width={230} />
                    }
                </Box>
            </Grid>
        </Grid>
    );
};

export default MemberPic;