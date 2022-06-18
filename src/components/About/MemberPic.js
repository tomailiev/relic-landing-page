import { Grid } from "@mui/material"
import { Box } from "@mui/system";
import t from '../../imgs/toma_portrait.jpg';


const MemberPic = () => {
    return (
        <Grid item md={5} xs={12}>
            <Grid container justifyContent={'center'}>
                <Box overflow={'hidden'} borderRadius="50%" height={'360px'}>
                    <img src={t} height="400px" alt="member avatar" />
                </Box>
            </Grid>
        </Grid>
    );
};

export default MemberPic;