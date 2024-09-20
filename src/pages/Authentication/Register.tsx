import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { registerUserAction } from '../../redux/auth/auth.action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { useNavigate } from 'react-router-dom'

interface FormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  gender: string
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: '',
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short'),
})

const Register = () => {
  const [gender, setGender] = useState('')
  const dispatch: ThunkDispatch<unknown, unknown, AnyAction> = useDispatch()
  const handleSubmit = (values: FormValues) => {
    values.gender = gender
    dispatch(registerUserAction(values))
    console.log('Register successful', values)
    navigate('/')
  }

  const navigate = useNavigate()

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <Field
                as={TextField}
                name='firstName'
                placeholder='First Name'
                variant='outlined'
                fullWidth
              />
              <ErrorMessage
                name='firstName'
                component={'div'}
                className='text-red-500'
              />
            </div>
            <div>
              <Field
                as={TextField}
                name='lastName'
                placeholder='Last Name'
                variant='outlined'
                fullWidth
              />
              <ErrorMessage
                name='lastName'
                component={'div'}
                className='text-red-500'
              />
            </div>
            <div>
              <Field
                as={TextField}
                name='email'
                placeholder='Email'
                variant='outlined'
                fullWidth
              />
              <ErrorMessage
                name='email'
                component={'div'}
                className='text-red-500'
              />
            </div>
            <div>
              <Field
                as={TextField}
                name='password'
                placeholder='Password'
                variant='outlined'
                fullWidth
              />
              <ErrorMessage
                name='password'
                component={'div'}
                className='text-red-500'
              />
            </div>
            <div>
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
            </div>
            <Button type='submit' variant='contained'>
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <div className='pt-5 flex justify-center items-center gap-2'>
        <p>Have account yet ?</p>
        <Button
          variant='text'
          color='primary'
          onClick={() => {
            navigate('/login')
          }}
        >
          Login
        </Button>
      </div>
    </div>
  )
}

export default Register
