import { Box, Button, TextField, Stack, Typography } from "@mui/material"
import { useContext, useState } from "react";
import LoadingContext from "../../context/LoadingContext";
import NotificationContext from "../../context/NotificationContext";
import TextContext from "../../context/TextContext";
import { uploadDoc } from "../../utils/firebase/firestore-funcs";
import { emailSubSchema } from "../../utils/yup/schemas";

const fields = {
    firstName: '',
    lastName: '',
    email: '',
};

const fieldsArray = [
    { label: 'first name', id: 'firstName' },
    { label: 'last name', id: 'lastName' },
    { label: 'email', id: 'email' },
];

const SubscribeForm = () => {
    const { setNotification } = useContext(NotificationContext);
    const { setLoading } = useContext(LoadingContext);
    const { text } = useContext(TextContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userFields, setUserFields] = useState(fields);
    const [hasError, setHasError] = useState(fields);

    function handleSubscribe(e) {
        e.preventDefault();
        setLoading(true);
        setIsSubmitting(true);
        emailSubSchema.validate(userFields, { abortEarly: false })
            .then(val => uploadDoc(val, 'subscribers'))
            .then(() => {
                setUserFields(fields);
                setLoading(false);
                setIsSubmitting(false);
                setNotification({ type: 'success', message: 'Thank you for subscribing!' });
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
        });
    }


    return (
        <Box flex={1} sx={{ p: 5 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                {text.subscribeTitle || 'Subscribe to our list!'}
            </Typography>
            <form onSubmit={handleSubscribe}>
                <Stack spacing={2}>
                    {/* <TextField
                        error={!!hasError}
                        value={userEmail}
                        onFocus={() => setHasError('')}
                        onChange={handleInputChange}
                        helperText={hasError}
                        label="Your Email"
                        variant="outlined"
                        size="small"
                    /> */}
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
                            rows={4}
                        />
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        Subscribe
                    </Button>
                </Stack>
            </form>
        </Box>
    )
};

export default SubscribeForm;