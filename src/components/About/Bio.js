import { useTheme } from "@emotion/react";
import { Button, Collapse, Divider, Grid, Paper, Typography, useMediaQuery } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react";
import MemberPic from "./MemberPic";

const Bio = ({ picRight }) => {
    const theme = useTheme();
    const xsMatch = useMediaQuery(theme.breakpoints.down('md'));
    const [isFullBioOpen, setIsFullBioOpen] = useState(false);

    function toggleFullBio() {
        setIsFullBioOpen(!isFullBioOpen);
    }

    return (
        <>
            <Divider />
            <Box textAlign={'left'} sx={{ my: 5 }}>
                <Paper>
                    <Grid container spacing={2} justifyContent={'center'}>
                        {(!picRight || xsMatch) && <MemberPic />}
                        <Grid item md={6} xs={12} m={xsMatch && 5} textAlign={!picRight && !xsMatch ? 'right' : 'left'}>
                            <Collapse collapsedSize={330} in={isFullBioOpen}>
                                <Typography fontSize={18}>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea cum excepturi, odio iste officiis, perferendis a ipsa eveniet, impedit quia aut deserunt quas pariatur id. Similique, voluptatibus? Eius numquam voluptatem recusandae facilis corporis alias est! Pariatur, itaque minus? Debitis illo maxime ullam, facere voluptatem sint rerum nobis tenetur expedita provident, repellendus enim dolore eius. Quaerat vel hic soluta reiciendis a quam veniam incidunt, doloremque perspiciatis nemo id alias facilis, cupiditate, necessitatibus amet pariatur dicta. Dolorum recusandae voluptatibus soluta et enim quia illum, qui, error odio amet iste dolorem molestias sit distinctio veniam quidem harum cum officiis. Nihil mollitia enim voluptatum facilis officia aperiam dignissimos similique molestiae fugit, eveniet numquam necessitatibus? Animi doloribus sint a vitae illo, nisi earum dolorem minus ipsam labore, laudantium obcaecati quasi at dolore, doloremque hic possimus molestias reiciendis! Dolores qui autem facilis fugiat ab dolor id debitis. Quibusdam laborum voluptate vel repellendus eveniet ut aut nemo quidem similique maiores facilis cum, hic molestiae accusantium deserunt ad placeat ipsam incidunt ratione, tenetur atque recusandae fugit? Accusamus ad, vero veniam rerum debitis corporis tempore tempora. Ullam accusamus placeat quaerat numquam consequuntur explicabo, iusto voluptatibus, doloremque animi doloribus consectetur tenetur neque, minima nobis optio! Magnam ratione tenetur eligendi labore.
                                </Typography>
                            </Collapse>
                            <Button sx={{ justifySelf: 'center', my: 1 }} variant="contained" color="secondary" onClick={toggleFullBio}>Read {isFullBioOpen ? 'less' : 'more'}</Button>
                        </Grid>
                        {picRight && !xsMatch && <MemberPic />}
                    </Grid>
                </Paper>
            </Box>
        </>
    );
};

export default Bio;