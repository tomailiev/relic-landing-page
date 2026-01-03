import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { Card, CardActionArea, CardMedia, Grid, List, ListItem, ListItemAvatar, Paper, Skeleton, Typography, Box, Container, Avatar } from "@mui/material";

const EventSkeleton = () => {

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={5} size={{ xs: 12, md: 5 }}>
                    <Card raised sx={{ width: '100%' }}>
                        <CardActionArea sx={{ width: '100%' }}>
                            {/* <div style={{ maxHeight: 800, minWidth: 250, display: 'flex', justifyContent: 'center', background: '#d7d4cf' }}> */}
                            {/* {!imgLoaded && <Skeleton variant="rectangular" width='100%' height={'400px'} />} */}
                            {/* <Link href={url} target={'_blank'} underline={'none'}> */}
                            <CardMedia
                                component={Box}
                                height="400px"
                                width={'100%'}
                                // image={src}
                                alt="event picture"
                            // sx={!imgLoaded ? { width: 0, height: 0 } : { maxHeight: '100%', maxWidth: '100%' }}
                            // onLoad={() => setImgLoaded(true)}
                            >
                                <Skeleton height={'100%'} variant='rectangular' />
                            </CardMedia>
                            {/* </Link> */}
                            {/* </div> */}
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={7} size={{ xs: 12, md: 7 }} textAlign={'left'} >
                    <Typography variant="h4" mb={2} width={'100%'}>
                        <Skeleton variant={'rectangular'} height={30} />
                    </Typography>
                    <Typography variant='body1' mb={2} width={'100%'}>
                        <Skeleton variant={'rectangular'} height={80} />
                    </Typography>
                    <Container disableGutters>
                        <Typography variant="h6" mt={2}>
                            Performances:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ConfirmationNumberOutlinedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <Typography my={1} width={'80%'}>
                                    <Skeleton variant={'rectangular'} height={26} />
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ConfirmationNumberOutlinedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <Typography my={1} width={'80%'}>
                                    <Skeleton variant={'rectangular'} height={26} />
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ConfirmationNumberOutlinedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <Typography my={1} width={'80%'}>
                                    <Skeleton variant={'rectangular'} height={26} />
                                </Typography>
                            </ListItem>
                        </List>
                    </Container>
                </Grid>
            </Grid>
        </Paper >
    );
};

export default EventSkeleton;