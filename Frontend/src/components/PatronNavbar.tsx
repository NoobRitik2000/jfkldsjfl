import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Container,Box } from '@mui/material';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const PatronNavbar: React.FC = () => {
        const router = useRouter();
      
        const handleLogout = async () => {
            const { isConfirmed } = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you really want to logout?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, logout!',
                cancelButtonText: 'No, cancel!',
              });
          
              if (isConfirmed) {
            const token = localStorage.getItem('userToken');
            if (token) {
              localStorage.removeItem('userToken');
              console.log('Token removed');
            //   console.log( localStorage.getItem('userToken'));
              
            } else {
              console.warn('No token found, nothing to remove');
            }       
            router.push('login');
          };
        }
  return (
    <AppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}
          >
            Library Dashboard
          </Typography>
          <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
            <Button color="inherit" component={Link} href="/patron-dashboard">
              My Dashboard
            </Button>
            <Button color="inherit" component={Link} href="/my-account">
              My Account
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PatronNavbar;
