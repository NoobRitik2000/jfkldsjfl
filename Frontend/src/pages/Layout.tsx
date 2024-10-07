// components/Layout.tsx
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Library Management System
        </Typography>
        <Link href="/login" passHref>
          <Typography component="button" color="inherit" sx={{ marginRight: 2 }}>
            Login
          </Typography>
        </Link>
        <Link href="/signup" passHref>
          <Typography component="button" color="inherit">
            Signup
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ marginTop: 2 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
