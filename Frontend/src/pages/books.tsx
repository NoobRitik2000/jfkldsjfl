// import React, { useEffect, useState } from 'react';

// interface Book {
//     book_id: number;
//     title: string;
//     author: string;
//     isbn: string;
//     genre?: string;
//     cover_image_url?: string;
//     available_copies: number;
//     total_copies: number;
// }

// const Books: React.FC = () => {
//     const [books, setBooks] = useState<Book[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [searchQuery, setSearchQuery] = useState<string>('');

//     const fetchBooks = async (query: string) => {
//         try {
//             const response = await fetch(`/api/books?query=${query}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setBooks(data);
//         } catch (error:any) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSearch = async () => {
//         setLoading(true); // Set loading state
//         await fetchBooks(searchQuery); // Fetch books based on the search query
//     };

//     useEffect(() => {
//         fetchBooks(''); // Initial fetch without any query
//     }, []);

//     if (loading) return <p>Loading books...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div>
//             <h1>Available Books</h1>
//             <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search for a book"
//             />
//             <button onClick={handleSearch}>Search</button>
//             <ul>
//                 {books.map((book) => (
//                     <li key={book.book_id}>
//                         <h2>{book.title}</h2>
//                         <p>Author: {book.author}</p>
//                         <p>ISBN: {book.isbn}</p>
//                         <p>Genre: {book.genre}</p>
//                         <p>Available Copies: {book.available_copies}</p>
//                         <img src={book.cover_image_url} alt={book.title} style={{ width: '100px' }} />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Books;
