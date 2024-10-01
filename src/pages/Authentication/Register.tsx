import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Box,
} from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { RegisterData } from '../../interface/UserInterface'
import { signUp } from '../../api/authApi'
import { ErrorMessageStyled } from '../../components/ErrorMessageStyled/ErrorMessageStyled'

const initialValues: RegisterData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
})

const Register = () => {
  const navigate = useNavigate()

  const handleSubmit = (values: RegisterData) => {
    signUp(values)
      .then(() => {
        console.log('Register successful', values)
        navigate('/')
      })
      .catch((error) => {
        console.error('Registration failed', error)
      })
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }: { handleSubmit: () => void }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              sx={{
                height: '90px',
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: '10px',
              }}
            >
              <Field
                as={TextField}
                name='firstName'
                placeholder='First Name'
                variant='outlined'
                fullWidth
                label='First Name'
              />
              <ErrorMessage name='firstName' component={ErrorMessageStyled} />
            </Box>
            <Box
              sx={{
                height: '90px',
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: '10px',
              }}
            >
              <Field
                as={TextField}
                name='lastName'
                placeholder='Last Name'
                variant='outlined'
                fullWidth
                label='Last Name'
              />
              <ErrorMessage name='lastName' component={ErrorMessageStyled} />
            </Box>
            <Box
              sx={{
                height: '90px',
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: '10px',
              }}
            >
              <Field
                as={TextField}
                name='email'
                placeholder='Email'
                variant='outlined'
                fullWidth
                label='Email'
              />
              <ErrorMessage name='email' component={ErrorMessageStyled} />
            </Box>
            <Box
              sx={{
                height: '90px',
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: '10px',
              }}
            >
              <Field
                as={TextField}
                name='password'
                placeholder='Password'
                variant='outlined'
                fullWidth
                type='password'
                label='Password'
              />
              <ErrorMessage name='password' component={ErrorMessageStyled} />
            </Box>
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography>Have an account?</Typography>
        <Button
          variant='text'
          color='primary'
          onClick={() => {
            navigate('/login')
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  )
}

export default Register
