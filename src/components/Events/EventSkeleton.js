import { Grid, List, ListItem, Paper, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";

const EventSkeleton = () => {

    return (
        <Paper elevation={3} sx={{ p: 5 }}>
            <Grid container spacing={6}>
                <Grid item sm={12} md={5} p="1">
                    <Skeleton
                        variant="rectangular" width={250} height={250}
                    />
                </Grid>
                <Grid item sm={12} md={7} textAlign={'left'}>
                    <Typography variant="h4" mb={2}>
                        <Skeleton width={250} />
                    </Typography>
                    <Typography variant="body1">
                        <Skeleton width={250} />
                    </Typography>
                    <Container disableGutters>
                        <Typography variant="h6" mt={2}>
                            <Skeleton width={250} />
                        </Typography>
                        <List>
                            <ListItem>
                                <Typography variant="body1">
                                    <Skeleton />
                                </Typography>
                            </ListItem>
                        </List>
                    </Container>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default EventSkeleton;