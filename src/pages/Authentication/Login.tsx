import { Button, TextField, Typography, Box } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../api/authApi'
import { LoginData } from '../../interface/UserInterface'

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

  const handleSubmit = async (values: LoginData) => {
    try {
      await signIn(values)
      console.log('Login successful', values)
      navigate('/')
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant='h5' component='h1' gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box className='space-y-5'>
              <Field
                as={TextField}
                name='email'
                placeholder='Email'
                type='email'
                variant='outlined'
                fullWidth
                label='Email'
              />
              <ErrorMessage
                name='email'
                component='div'
                className='text-red-500'
              />
            </Box>
            <Box className='space-y-5'>
              <Field
                as={TextField}
                name='password'
                placeholder='Password'
                type='password'
                variant='outlined'
                fullWidth
                label='Password'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='text-red-500'
              />
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
      <Box className='pt-5 flex justify-center items-center gap-2'>
        <Typography>Don't have an account?</Typography>
        <Button
          variant='text'
          color='primary'
          onClick={() => {
            navigate('/register')
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  )
}

export default Login
