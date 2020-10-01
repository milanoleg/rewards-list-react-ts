import * as yup from 'yup';

let schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .min(3, 'Name must be at least 3 characters')
    .required(),
  experience: yup
    .string()
    .required('Experience is a required field')
    .min(10, 'Experience must be at least 10 characters')
    .required(),
  status: yup.string().required(),
  date: yup
    .date()
    .default(() => new Date())
    .required()
});

export default schema;
