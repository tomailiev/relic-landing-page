import { useContext } from "react";
import LoadingContext from "../../context/LoadingContext";
import { links } from "../../data/links";
import { Link, Typography } from "@mui/material";

const DonateForm = () => {

    const { setLoading } = useContext(LoadingContext);
    
    return (
        <>
            <iframe title="donation-frame" className="iframe-class" src={links.gems} width="100%" height={'610px'} frameBorder="0" scrolling="auto" marginHeight="0" marginWidth="0" allowtransparency="true" onLoad={() => setLoading(false)} onError={() => setLoading(false)}></iframe>
            <Typography variant="body2" fontStyle={'italic'}>
                Form not loading? <Link href={links.gems} target="_blank" referrerPolicy="no-referrer">Click here</Link>
            </Typography>
        </>
    );
};

export default DonateForm;