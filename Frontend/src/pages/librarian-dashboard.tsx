// // LibrarianDashboard.tsx
// import { useState } from 'react';
// import { Box, Typography, Button, Container, List, ListItem } from '@mui/material';

// const LibrarianDashboard: React.FC = () => {
//   const [books, setBooks] = useState([]); // Mock data for demonstration
//   const [patrons, setPatrons] = useState([]); // Mock data for patrons

//   return (
//     <Container maxWidth="lg">
//       <Typography variant="h4" gutterBottom>
//         Librarian Dashboard
//       </Typography>
//       <Box mt={2}>
//         <Button variant="contained" color="primary">Add New Book</Button>
//       </Box>
//       <Box mt={5}>
//         <Typography variant="h6">Manage Books</Typography>
//         <List>
//           {books.map((book) => (
//             <ListItem key={book.id}>
//               <Typography variant="body1">{book.title} by {book.author}</Typography>
//               <Button variant="outlined" color="primary">Edit</Button>
//               <Button variant="outlined" color="secondary">Delete</Button>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//       <Box mt={5}>
//         <Typography variant="h6">Manage Patrons</Typography>
//         <Button variant="contained" color="primary">Register New Patron</Button>
//         <List>
//           {patrons.map((patron) => (
//             <ListItem key={patron.id}>
//               <Typography variant="body1">{patron.name}</Typography>
//               <Button variant="outlined" color="primary">View</Button>
//               <Button variant="outlined" color="secondary">Edit</Button>
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Container>
//   );
// };

// export default LibrarianDashboard;
