// pages/signup.tsx
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Container, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link from Next.js
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string; // Add role to the inputs
}

export default function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormInputs>();
  const password = watch('password');
  const router = useRouter();

  const onSubmit = async (data: SignupFormInputs) => {
    localStorage.setItem('userData', JSON.stringify(data));
    try {
      const response = await axios.post('http://localhost:5000/api/signup', data);
      console.log("response", response);

      // Display success message
      if (response.status === 201) {
        Swal.fire({
          title: 'Registered Successfully!',
          text: 'You will be redirected to your dashboard.',
          icon: 'success',
          timer: 2000, // Close the dialog after 2 seconds
          showConfirmButton: false,
        });

        // Redirect to the appropriate dashboard after 2 seconds
        setTimeout(() => {
          if (data.role === 'Librarian') {
            router.push('/librarian-dashboard');
          } else if (data.role === 'Patron') {
            router.push('/patron-dashboard');
          }
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong during registration. Please try again.',
        icon: 'error',
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: 'calc(100vh - 64px)', // Full height minus AppBar height
        display: 'flex',
        flexDirection: 'column', // Align items vertically
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        marginTop: '64px' // Push content below the AppBar
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>Signup</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register('name', {
              required: 'Name is required',
              pattern: {
                value: /^[A-Z][a-zA-Z]*$/,
                message: 'Name must start with a capital letter and contain only letters'
              }
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/,
                message: 'Email must be in lowercase and valid format'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters long' },
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/,
                message: 'Password must include at least one digit and one special character'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('confirmPassword', {
              validate: value => value === password || 'Passwords do not match'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
              <FormControl fullWidth margin="normal" error={!!errors.role}>
          <InputLabel>Role</InputLabel>
          <Select
            label="Role"
            defaultValue="Patron" // Set the default value to "Patron"
            disabled // Keep the select disabled
          >
            <MenuItem value="Patron">Patron</MenuItem>
            {/* Remove librarian option */}
          </Select>
          {errors.role && <Typography color="error">{errors.role.message}</Typography>}
        </FormControl>


          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Signup
          </Button>
        </form>
        <Typography variant="body2" mt={2}>
          Already have an account? <Link href="/login">Login here</Link>
        </Typography>
      </Box>
    </Container>
  );
}
