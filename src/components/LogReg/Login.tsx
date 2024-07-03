import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

function Login() {

    const userSchema = Yup.object().shape({
        email: Yup.string().email('Enter a valid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        name: Yup.string().required('Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    });

    const onSubmit = (values) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            lastName: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: userSchema,
        onSubmit,
    });

    return (
        <div className="d-flex justify-content-center align-items-center h-100 m-5 mx-auto" style={{ maxWidth: '500px' }}>
            <div className="login-form p-4">
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="email"
                                    name="email"
                                    placeholder="example@example.com"
                                    
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
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className='text-danger'>{formik.errors.password}</div>
                                ) : null}
                            </FormGroup>
                        </Col>
                        
                    </Row>
                    <Button className="w-100 mt-3" type="submit" color="secondary">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
