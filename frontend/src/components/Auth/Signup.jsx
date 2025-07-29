import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
export default function Signup() 
{
    const navigate = useNavigate();
    const formik = useFormik(
    {
        initialValues: { full_name: '', email: '', password: '' },
        validationSchema: Yup.object(
        {
            full_name: Yup.string().required('Required'),
            email: Yup.string().required('Required').email('Invalid email'),
            password: Yup.string().min(6, 'Must be at least 6 characters').required('Required')
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => 
        {
            try 
            {
                await axios.post('/auth/signup', values);
                navigate('/login');
            } 
            catch (err) 
            {
                setErrors({ email: err.response?.data?.error || 'Signup failed' });
            }
            setSubmitting(false);
        }
    });
    return (
    <Box sx={{ mt: 8, maxWidth: 400, mx: 'auto' }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" mb={2}>Sign Up</Typography>
        <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                label="Full Name"
                name="full_name"
                margin="normal"
                value={formik.values.full_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                helperText={formik.touched.full_name && formik.errors.full_name}
            />
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
            <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }} disabled={formik.isSubmitting}>
                Sign Up
            </Button>
        </form>
        <Typography variant="body2" mt={2}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
}