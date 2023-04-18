import { Link, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { links } from "../../data/links";
import { analyze } from "../../utils/firebase/firestore-funcs";

const Forward = () => {

    const [seconds, setSeconds] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        analyze('select_content', { content_type: 'donate_button' });
        return () => clearInterval(interval);
    }, []);

    if (seconds <= 0) {
        window.location.replace(links.gems);
    }

    return (
        <Container sx={{ height: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h5" textAlign={'center'}>
                You will be redirected to our <Link href={links.gems}>donation page</Link> in {seconds} seconds
            </Typography>
        </Container>
    );
};

export default Forward;