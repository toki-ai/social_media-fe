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
import { useState } from 'react'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { RegisterData } from '../../interface/UserInterface'
import { signUp } from '../../api/AuthApi'

const initialValues: RegisterData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: '',
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
  const [gender, setGender] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (values: RegisterData) => {
    values.gender = gender
    signUp(values)
      .then(() => {
        console.log('Register successful', values)
        navigate('/')
      })
      .catch((error) => {
        console.error('Registration failed', error)
        // Xử lý lỗi nếu cần
      })
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant='h5' component='h1' gutterBottom>
        Register
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Field
                as={TextField}
                name='firstName'
                placeholder='First Name'
                variant='outlined'
                fullWidth
                label='First Name'
              />
              <ErrorMessage
                name='firstName'
                component='div'
                className='text-red-500'
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Field
                as={TextField}
                name='lastName'
                placeholder='Last Name'
                variant='outlined'
                fullWidth
                label='Last Name'
              />
              <ErrorMessage
                name='lastName'
                component='div'
                className='text-red-500'
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Field
                as={TextField}
                name='email'
                placeholder='Email'
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
            <Box sx={{ mb: 2 }}>
              <Field
                as={TextField}
                name='password'
                placeholder='Password'
                variant='outlined'
                fullWidth
                type='password'
                label='Password'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='text-red-500'
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <RadioGroup
                aria-labelledby='gender'
                value={gender}
                onChange={(event) => {
                  setGender(event.target.value)
                }}
              >
                <FormControlLabel
                  value='female'
                  control={<Radio />}
                  label='Female'
                />
                <FormControlLabel
                  value='male'
                  control={<Radio />}
                  label='Male'
                />
              </RadioGroup>
            </Box>
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Box className='pt-5 flex justify-center items-center gap-2'>
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
