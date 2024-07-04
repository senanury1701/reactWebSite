import React from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector, } from 'react-redux';
import { login  } from '../../features/auth/authSlice';
import { selectAuthLoading, selectAuthError } from '../../features/auth/authSelectors';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {     
        await dispatch(login(values.email, values.password));
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });


  return (
    <div className="d-flex justify-content-center align-items-center h-100 mx-auto" style={{ maxWidth: '500px' }}>
      <div className="login-form ">
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md="12">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className='text-danger'>{formik.errors.email}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className='text-danger'>{formik.errors.password}</div>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <Button style={{ backgroundColor: '#947eed' }} className="w-100 mt-3" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          {error && <div className='text-danger mt-3'>{error}</div>}
        </Form>
      </div>
    </div>
  );
}

export default Login;
