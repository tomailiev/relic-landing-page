import { useContext } from "react";
import TextContext from "../../context/TextContext";
import { Box, Typography } from "@mui/material";
// import TypographyCombo from "./TypographyCombo";
import { bgs } from "../../data/images";
import DonorTierItem from "./DonorTierItem";
import Seo from "../Common/SEO";

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
                : valueType === 'Description'
                    ? a[index].description = value
                    : a[index].perks = value;
            return a;
        }, []);

    return (
        <>
            <Seo title={'The Relic Pantheon'} description={'Donor tiers and benefits.'} />
            <Box
                sx={{
                    width: '100%',
                    // height: { xs: 300, sm: 400, md: 500 },
                    // background: '#e2d3a0',
                    background: `center center / auto 100% no-repeat url(${bgs.pantheonBg}), #e2d3a0`,
                    // backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                    pb: 3,
                }}>
                <Typography variant="h3" textAlign={'center'} fontWeight={600} pt={8} mb={10} mt={0}>
                    The Relic Pantheon
                </Typography>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    '& > *': {
                        width: { xs: '100%', md: '51%' },
                    },
                }}
                >
                    {
                        tiers.reverse().map(tier => <DonorTierItem key={tier.title} title={tier.title} text={tier.description} additional={tier.perks} />)
                    }
                </Box>
            </Box>
        </>
    );
};

export default DonorLevels;