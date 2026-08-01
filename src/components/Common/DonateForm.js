import { useContext } from "react";
import LoadingContext from "../../context/LoadingContext";
import { links } from "../../data/links";
import { Box, Link, Typography } from "@mui/material";

const DonateForm = () => {

    const { setLoading } = useContext(LoadingContext);


    return (
        <>
            
            <Box display={'flex'} justifyContent={'center'} flexDirection={'row'}>
                <Box width={'425px'}>
                    <iframe title="donate-form-donorbox" src="https://donorbox.org/embed/donate-to-relic?" name="donorbox" allowpaymentrequest="allowpaymentrequest" seamless="seamless" frameborder="0" scrolling="no" height="900px" width="100%" style={{ maxWidth:'550px', minWidth: '300px', maxHeight: 'none !important' }} allow="payment" onLoad={() => setLoading(false)} onError={() => setLoading(false)}></iframe>

                </Box>

            </Box>

            <Typography variant="body2" fontStyle={'italic'}>
                Form not loading? <Link href={links.donorBox} target="_blank" referrerPolicy="no-referrer">Click here</Link>
            </Typography>
        </>
    );
};

export default DonateForm;