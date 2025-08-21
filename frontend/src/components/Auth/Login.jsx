import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
export default function Login() 
{
    const navigate = useNavigate();
    const formik = useFormik(
    {
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object(
        {
            email: Yup.string().required('Required').email('Invalid email'),
            password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) =>
        {
            try 
            {
                const res = await axios.post('/auth/login', 
                {
                    email: values.email,
                    password: values.password,
                });
                localStorage.setItem('token', res.data.token);
                navigate('/dashboard');
            } 
            catch (err) 
            {
                console.error(err);
                setErrors({ email: 'Invalid credentials' });
            }
            setSubmitting(false);
        },
    });
    return (
        <Box sx={{ mt: 8, maxWidth: 400, mx: 'auto' }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" mb={2}>
                Sign In
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    margin="normal"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    margin="normal"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 2 }}
                    disabled={formik.isSubmitting}
                >
                    Login
                </Button>
                </form>
                <Typography variant="body2" mt={2}>
                Don't have an account? <Link to="/signup">Sign Up</Link>
                </Typography>
            </Paper>
        </Box>
    );
}