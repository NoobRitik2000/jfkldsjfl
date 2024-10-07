// pages/guest-dashboard.tsx
import { useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';

const GuestDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookDetails, setBookDetails] = useState<any | null>(null);

  const handleSearch = async () => {
    // Simulate a book search. Replace this with a real API call.
    // Example: const response = await fetch(`/api/books?query=${searchQuery}`);
    // const data = await response.json();

    const mockBookData = {
      title: 'Example Book Title',
      author: 'Example Author',
      description: 'This is a brief description of the example book.',
    };

    if (searchQuery.toLowerCase() === 'example') {
      setBookDetails(mockBookData);
    } else {
      setBookDetails(null);
    }
  };

  return (
    <Container maxWidth="sm"  sx={{
      height: '80vh', // Full height minus AppBar height
      display: 'flex',
      flexDirection: 'column', // Align items vertically
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
       // Push content below the AppBar
    }}>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Guest User Dashboard
        </Typography>
        <Typography variant="h6" gutterBottom>
          Book Search
        </Typography>
        <TextField
          label="Search for books"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>

        {bookDetails && (
          <Box mt={4}>
            <Typography variant="h5">{bookDetails.title}</Typography>
            <Typography variant="subtitle1">Author: {bookDetails.author}</Typography>
            <Typography variant="body2">{bookDetails.description}</Typography>
          </Box>
        )}

        <Box mt={5}>
          <Typography variant="h6" gutterBottom>
            Library Information
          </Typography>
          <Typography variant="body1">
            <strong>Contact:</strong> (123) 456-7890
          </Typography>
          <Typography variant="body1">
            <strong>Operating Hours:</strong> Mon-Fri: 9 AM - 5 PM
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default GuestDashboard;