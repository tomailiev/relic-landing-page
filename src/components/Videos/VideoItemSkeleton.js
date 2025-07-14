import {
  Grid,
  Paper,
  Card,
  CardContent,
  Box,
  Skeleton,
} from '@mui/material';


export default function VideoItemSkeleton({ playIcon }) {
  return (
    <Grid item xs={12} sm={6} md={4} display="flex">
      <Paper elevation={5} sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Card
          sx={{
            flexGrow: 1,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              pt: '56.25%',
              overflow: 'hidden',
            }}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transformOrigin: 'center',
              }}
            />

            {playIcon && <Skeleton
              variant="circular"
              animation={false}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '20%',
                height: '35.56%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.3,
              }}
            />}
          </Box>

          {/* ─────────── Title placeholder ─────────── */}
          <CardContent>
            <Skeleton variant="text" width="60%" height={24} />
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  );
}
