import { boolean, object, string } from 'yup'
const emailSubSchema = object({
    email: string().email('Valid email is required').required('Valid email is required'),
});

const contactFormSchema = object({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    email: string().email('Valid email is required').required(),
    message: string().required('Message is required').min(3, 'Message must be 3 characters or more'),
    subscriber: boolean().default(true)
});

export { emailSubSchema, contactFormSchema };