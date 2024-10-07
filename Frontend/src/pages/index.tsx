// pages/index.tsx
import { Typography, Box, Container, Button, AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
  return (
    
    <AppBar position="fixed"color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Library Management System
        </Typography>
        <Link href="/login" passHref>
          <Button color="warning">Login</Button>
        </Link>
        <Link href="/signup" passHref>
          <Button color="warning">Signup</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};



export default function Home() {
  return (
    <>
      <Navbar /> {/* Navbar at the top */}
      <Container
        maxWidth="sm"
        sx={{
          backgroundImage: 'url("https://www.skoolbeep.com/blog/wp-content/uploads/2020/12/WHAT-IS-THE-PURPOSE-OF-A-LIBRARY-MANAGEMENT-SYSTEM-min.png")', // Add your image path here
          backgroundSize:'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          // justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box mt={5} textAlign="center">
          <Typography variant="h3" gutterBottom  fontFamily={'cursive'}>
            Welcome to the Library Management System
          </Typography>
          <Typography variant="h6" gutterBottom>
            Please login or signup to continue.
          </Typography>        
        </Box>
      </Container>
    </>
  );
}

