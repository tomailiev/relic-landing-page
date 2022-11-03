import { Box, Container } from "@mui/system";
import dividerIcon from '../../assets/graphics/custom-divider-bl.png';

const CustomDivider = () => {

    return (
        <Container maxWidth={false} disableGutters sx={{ my: 5, display: 'flex', justifyContent: 'center' }}>
            <Box maxWidth={'5%'}>
                <img src={dividerIcon} alt={'divider'} width={'100%'} />
            </Box>
        </Container>
    );
};

export default CustomDivider;