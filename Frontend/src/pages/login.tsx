// pages/login.tsx
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Swal from 'sweetalert2';
import axios from 'axios';

interface LoginFormInputs {
  email: string;
  password: string;
  role:string
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    console.log(data);
    
    try {
      const response = await axios.post('http://localhost:5000/api/login', data); // Call your login API
      // console.log('i am response.........................', response)//debug console
      if (response.status === 200) {
        const user = response.data.user;
        const token = response.data.token; // Adjust based on your API response structure
      
        // Store the token in local storage
        localStorage.setItem('userToken', token);
        console.log('Token stored:', localStorage.getItem('userToken')); // Verify storage
        Swal.fire({
          title: "Login Successful",
          text: "You will be redirected to your dashboard.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        })  // Redirect to the appropriate dashboard after 2 seconds
        setTimeout(() => {
          if (user.role === 'Librarian') {
            router.push('/librarian-dashboard'); // Redirect to librarian dashboard
          } else if (user.role === 'Patron') {
            // console.log('i am patron.........................')
            router.push('/patron-dashboard'); // Redirect to patron dashboard
          }
        }, 2000); // Wait for 2 seconds before redirecting
      }
    } catch (error) {
      Swal.fire({
        title: 'Login Failed',
        text:  'Incorrect email or password!',
        icon: 'error',
      });
    }
  };

  const handleGuestUser = () => {
    router.push('/guest-dashboard'); // Redirect to the guest user dashboard
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '64px'
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Login
          </Button>
        </form>
        <Typography variant="body2" mt={2}>
          Don't have an account? <Link href="/signup">Sign up here</Link>
        </Typography>
        <Typography variant="body2" mt={2} textAlign="center">
          OR
        </Typography>
        <Box mt={2} textAlign="center">
          <Button variant="outlined" onClick={handleGuestUser}>
            Guest User
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
