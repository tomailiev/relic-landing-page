import { useContext } from "react";
import TextContext from "../../context/TextContext";
import { Box, Container, Typography } from "@mui/material";
import TypographyCombo from "./TypographyCombo";

const DonorLevels = () => {
    const { text } = useContext(TextContext);
    const tiers = Object.entries(text)
        .filter(([key,]) => key.startsWith('tier'))
        .reduce((a, [key, value]) => {
            const index = parseInt(key.replace('tier', ''));
            if (!index && index !== 0) return a;
            const valueType = key.replace('tier', '').substring(1);
            if (!a[index]) {
                a[index] = {};
            }
            valueType === 'Value'
                ? a[index].title = value
                : a[index].description = value;
            return a;
        }, []);

    return (
        <>
            <Typography variant="h3" textAlign={'center'} mt={8} mb={10}>
                The Relic Pantheon
            </Typography>
            <Box mb={5}>
                <Container maxWidth={'md'}>
                    {
                        tiers.reverse().map(tier => <TypographyCombo key={tier.title} title={tier.title} text={tier.description} />)
                    }
                </Container>
            </Box>
        </>
    );
};

export default DonorLevels;