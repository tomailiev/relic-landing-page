import { object, string } from 'yup'
const emailSubSchema = object({
    email: string().email().required(),
});

export { emailSubSchema };