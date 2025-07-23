import { Box, Skeleton } from '@mui/material';

const EventCardSkeleton = () => (
    <Box sx={{ my: 4 }}>
        <Skeleton variant="rectangular" height={300} width="100%" sx={{ borderRadius: 3 }} />
    </Box>
);

export default EventCardSkeleton;