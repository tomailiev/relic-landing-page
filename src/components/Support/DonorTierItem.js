import { Box, Typography } from "@mui/material";

const DonorTierItem = ({ title, text, additional }) => {

    return (
        <Box sx={{
            background: 'rgba(247, 244, 235, 0.9)',
            borderBottom: '2px dashed #252745',
            p: 3,
            // position: 'relative',
            // '&::before': {
            //     content: '""',
            //     position: 'absolute',
            //     top: 0,
            //     left: '-10%',
            //     bottom: 0,
            //     width: '10%',
            //     background: 'linear-gradient(to right, rgba(247, 244, 235, 0), rgba(247, 244, 235, 0.9))',
            //     pointerEvents: 'none',
            //     display: { xs: 'none', md: 'block' }, // only show on md+
            // },
        }}>
            <Typography variant="h6" fontSize={'1.4em'} fontWeight={600}>
                {title}
            </Typography>
            <Typography fontSize={'1.3em'} mt={1}>
                {text}
            </Typography>
            {
                additional && <Typography variant="subtitle1" fontWeight={600}>{additional}</Typography>
            }
        </Box>
    );
};

export default DonorTierItem;