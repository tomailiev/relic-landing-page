import { Box, Button, Checkbox, FormControlLabel, Stack, TextField } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react";
import NotificationContext from "../../context/NotificationContext";
import { contactFormSchema } from "../../utils/yup/schemas";
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
import { uploadDoc, uploadDocWithId } from "../../utils/firebase/firestore-funcs";
import LoadingContext from "../../context/LoadingContext";
import { arrayUnion } from "firebase/firestore";

const fields = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
};

const fieldsArray = [
    { label: 'First name', id: 'firstName' },
    { label: 'Last name', id: 'lastName' },
    { label: 'Email', id: 'email' },
    { label: 'Message', id: 'message' },
];

const ContactForm = () => {

    const { setNotification } = useContext(NotificationContext);
    const { setLoading } = useContext(LoadingContext);
    const [userFields, setUserFields] = useState(fields);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasError, setHasError] = useState(fields);
    const [willSubscribe, setWillSubscribe] = useState(true);
    const [turnstileToken, setTurnstileToken] = useState(null);

    const turnstileRef = useRef(null);

    useEffect(() => {
        if (window.turnstile && turnstileRef.current) {
            window.turnstile.render(turnstileRef.current, {
                sitekey: "0x4AAAAAAFOusgR4gCpJ1KhB",
                callback: (token) => setTurnstileToken(token),
            });
        }

    }, []);

    // useEffect(() => {
    //     return window.turnstile.remove();
    // }, [])



    function handleSubscribe(e) {
        e.preventDefault();
        if (!turnstileToken) {
            setNotification({
                type: "error",
                message: "Please verify you're human before submitting."
            });
            return;
        }
        setLoading(true);
        setIsSubmitting(true);
        contactFormSchema.validate(userFields, { abortEarly: false })
            .then(val => {
                if (willSubscribe) {
                    const subscriberData = {
                        id: val.email.toLowerCase(),
                        imported: 'contact_form',
                        email: val.email.toLowerCase(),
                        status: 1,
                        location: '',
                        tags: arrayUnion('website'),
                        firstName: val.firstName,
                        lastName: val.lastName,
                    };
                    return Promise.all([
                        uploadDoc({ ...val, subscriber: willSubscribe, turnstileToken }, 'messages'),
                        uploadDocWithId(subscriberData, 'subscribers', val.email.toLowerCase())
                    ])
                }
                return uploadDoc({ ...val, subscriber: willSubscribe }, 'messages')
            })
            .then(() => {
                setUserFields(fields);
                setIsSubmitting(false);
                setNotification({ type: 'success', message: 'Message sent! We\'ll get back to you shortly' });
                setLoading(false);
            })
            .catch(e => {
                setIsSubmitting(false);
                setLoading(false);
                if (e.inner) {
                    const errors = e.inner.reduce((p, c) => {
                        return { ...p, [c.path]: c.message };
                    }, {});
                    setHasError(prev => ({ ...prev, ...errors }));
                    return;
                }
                console.log(e.errors);
            });
    }


    function handleInputChange(e) {
        setUserFields(prev => {
            return { ...prev, [e.target.id]: e.target.value }
        })
    }

    return (
        <Box my={4} p={3}>
            <form onSubmit={handleSubscribe}>
                <Stack spacing={2}>
                    {fieldsArray.map(({ id, label }) => (
                        <TextField
                            key={id}
                            id={id}
                            error={!!hasError[id]}
                            value={userFields[id]}
                            onFocus={() => setHasError(prev => ({ ...prev, [id]: '' }))}
                            onChange={handleInputChange}
                            helperText={hasError[id]}
                            label={label}
                            variant="outlined"
                            size="small"
                            multiline={id === 'message'}
                            rows={4}
                        />
                    ))}
                    <FormControlLabel
                        control={<Checkbox
                            // icon={<FavoriteBorder />}
                            // checkedIcon={<Favorite />}
                            checked={willSubscribe}
                            onChange={() => setWillSubscribe(!willSubscribe)}
                        />}
                        label={'Subscribe to our mailing list'}
                    />
                    <div
                        ref={turnstileRef}
                        className="cf-turnstile"
                    // data-sitekey="0x4AAAAAAFOusgR4gCpJ1KhB"
                    // data-execution="execute"
                    // data-callback={(token) => setTurnstileToken(token)}
                    ></div>

                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        Send
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default ContactForm;