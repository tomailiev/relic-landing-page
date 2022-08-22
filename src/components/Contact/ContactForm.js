import { Button, Checkbox, FormControlLabel, Stack, TextField } from "@mui/material"
import { useContext, useState } from "react";
import NotificationContext from "../../context/NotificationContext";
import { contactFormSchema } from "../../utils/yup/schemas";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { uploadDoc } from "../../utils/firebase/firestore-funcs";

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
]

const ContactForm = () => {

    const { setNotification } = useContext(NotificationContext);
    const [userFields, setUserFields] = useState(fields);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasError, setHasError] = useState(fields);
    const [willSubscribe, setWillSubscribe] = useState(true);


    function handleSubscribe(e) {
        e.preventDefault();
        setIsSubmitting(true);
        contactFormSchema.validate(userFields, { abortEarly: false })
            .then(val => uploadDoc({ ...val, subscriber: willSubscribe }, 'messages'))
            .then(() => {
                setUserFields(fields);
                setIsSubmitting(false);
                setNotification({ type: 'success', message: 'Message sent! We\'ll get back to you shortly' });
            })
            .catch(e => {
                setIsSubmitting(false);
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
                        label={`Your ${label}`}
                        variant="outlined"
                        size="small"
                    />
                ))}
                <FormControlLabel
                    control={<Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={willSubscribe}
                        onChange={() => setWillSubscribe(!willSubscribe)}
                    />}
                    label={'Subscribe to our mailing list'}
                />
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
    );
};

export default ContactForm;