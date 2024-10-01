import { Button, TextField, Typography, Box } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useLocation } from 'react-router-dom'
import { LoginData } from '../../interface/UserInterface'
import { signIn } from '../../api/authApi'
import { ErrorMessageStyled } from '../../components/ErrorMessageStyled/ErrorMessageStyled'

const initialValues = {
  email: '',
  password: '',
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const handleSubmit = async (values: LoginData) => {
    try {
      await signIn(values)
      navigate('/')
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              sx={{
                height: '90px',
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: '20px',
              }}
            >
              <Field
                as={TextField}
                name='email'
                placeholder='Email'
                type='email'
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
                type='password'
                variant='outlined'
                fullWidth
                label='Password'
              />
              <ErrorMessage name='password' component={ErrorMessageStyled} />
            </Box>
            <Button
              sx={{ padding: '0.8rem 0rem' }}
              fullWidth
              type='submit'
              variant='contained'
              color='primary'
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography>Don't have an account?</Typography>
        <Button
          variant='text'
          color='primary'
          onClick={() => {
            navigate('/register')
          }}
          sx={{}}
        >
          Register
        </Button>
      </Box>
    </Box>
  )
}

export default Login
