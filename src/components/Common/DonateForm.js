import { useContext, useEffect } from "react";
import LoadingContext from "../../context/LoadingContext";
import { links } from "../../data/links";
import { Link, Typography } from "@mui/material";

const DonateForm = () => {

    const { setLoading } = useContext(LoadingContext);

    useEffect(() => {
        // Zeffy exposes a global initializer
        if (window.Zeffy && window.Zeffy.embed) {
            console.log('init');
            setLoading(false);
            window.Zeffy.embed.init();
        }
    }, [setLoading]);

    return (
        <>
            <div>
                <div data-zeffy-embed data-form-url="/embed/donation-form/donate-to-relic-2"></div>
                {/* <div data-zeffy-embed-fallback>
                    <div style={{ position: 'relative', overflow: 'hidden', height: '450px', width: '100%' }}>
                        <iframe title='Donation form powered by Zeffy' style={{ position: 'absolute', border: 0, top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%' }} data-zeffy-embed-src='https://www.zeffy.com/embed/donation-form/donate-to-relic-2' allowpaymentrequest="true"></iframe>
                    </div>
                </div> */}
            </div>

            <Typography variant="body2" fontStyle={'italic'}>
                Form not loading? <Link href={links.zeffy} target="_blank" referrerPolicy="no-referrer">Click here</Link>
            </Typography>
        </>
    );
};

export default DonateForm;