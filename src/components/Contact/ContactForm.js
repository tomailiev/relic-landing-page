import { Button, Stack, TextField } from "@mui/material"
import { useContext, useState } from "react";
import NotificationContext from "../../context/NotificationContext";
import { contactFormSchema } from "../../utils/yup/schemas";

const fields = {
    firstname: '',
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


    function handleSubscribe(e) {
        e.preventDefault();
        setIsSubmitting(true);
        contactFormSchema.validate(userFields, { abortEarly: false })
            // .then(val => uploadDoc(val, 'subscribers'))
            .then(() => {
                // setUserEmail('');
                setIsSubmitting(false);
                setNotification({ type: 'success', message: 'Thank you for subscribing!' });
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
                <Button
                    variant="outlined"
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                >
                    Subscribe
                </Button>
            </Stack>
        </form>
    );
};

export default ContactForm;