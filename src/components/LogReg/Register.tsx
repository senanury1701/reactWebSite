import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

function Register() {

    const userSchema = Yup.object().shape({
        email: Yup.string().email('Enter a valid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required').min(8)
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.]).{6,}$/,
                'Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character'
            ),
        name: Yup.string().required('Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        confirmPassword: Yup.string().required()
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
                <h2 className="text-center mb-4">Register</h2>
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
                                <Label for="name">Name</Label>
                                <Input
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="name"
                                    name="name"
                                    placeholder="Your name"
                                    type="text"
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className='text-danger'>{formik.errors.name}</div>
                                ) : null}
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <Label for="lastName">Last Name</Label>
                                <Input
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Your last name"
                                    type="text"
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <div className='text-danger'>{formik.errors.lastName}</div>
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
                        <Col md="12">
                            <FormGroup>
                                <Label for="confirmPassword">Confirm Password</Label>
                                <Input
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    type="password"
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className='text-danger'>{formik.errors.confirmPassword}</div>
                                ) : null}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button style={{ backgroundColor: '#947eed' }} className="w-100 mt-3" type="submit"  >
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Register;
