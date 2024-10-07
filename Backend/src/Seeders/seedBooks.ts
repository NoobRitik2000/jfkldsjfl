import { Book } from '../models/bookModel'; // Adjust the import path as necessary

const seedBooks = async () => {
    try {
        // Hardcoded book data with specified titles
        const books = [
            {
                title: 'Rich Dad Poor Dad',
                author: 'Robert T. Kiyosaki',
                isbn: '9781612680194',
                genre: 'Personal Finance',
                cover_image_url: 'https://prodimage.images-bn.com/pimages/9781612681122_p0_v1_s600x595.jpg',
                available_copies: 5,
                total_copies: 10,
                created_at: new Date('2024-10-03T12:49:13.000Z')
            },
            {
                title: 'Think and Grow Rich',
                author: 'Napoleon Hill',
                isbn: '9781588362025',
                genre: 'Self-Help',
                cover_image_url: 'https://images-eu.ssl-images-amazon.com/images/I/61Q43BBSXbL._AC_UL210_SR210,210_.jpg',
                available_copies: 3,
                total_copies: 7,
                created_at: new Date('2024-10-03T13:08:29.000Z')
            },
            {
                title: 'Wings of Fire',
                author: 'A. P. J. Abdul Kalam',
                isbn: '9788173711466',
                genre: 'Autobiography',
                cover_image_url: 'https://m.media-amazon.com/images/I/81XHyheoX+L._AC_UF350,350_QL50_.jpg',
                available_copies: 4,
                total_copies: 8,
                created_at: new Date('2024-10-03T12:49:13.000Z')
            },
            {
                title: 'Time Management',
                author: 'Brian Tracy',
                isbn: '9781449565293',
                genre: 'Self-Help',
                cover_image_url: 'https://m.media-amazon.com/images/I/61wptuXBEgS._UF1000,1000_QL80_.jpg',
                available_copies: 2,
                total_copies: 5,
                created_at: new Date('2024-10-03T13:08:29.000Z')
            },
            {
                title: 'Atomic Habits',
                author: 'James Clear',
                isbn: '9780735211292',
                genre: 'Self-Help',
                cover_image_url: 'https://images-na.ssl-images-amazon.com/images/I/615bheKNgEL._AC_UL600_SR600,600_.jpg',
                available_copies: 6,
                total_copies: 10,
                created_at: new Date('2024-10-03T13:11:36.000Z')
            },
            {
                title: 'Analysis of Mind',
                author: 'Bertrand Russell',
                isbn: '9781498051865',
                genre: 'Philosophy',
                cover_image_url: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781633550551/the-analysis-of-mind-9781633550551_hr.jpg',
                available_copies: 3,
                total_copies: 5,
                created_at: new Date('2024-10-03T13:08:29.000Z')
            },
            {
                title: 'The Writing for my life',
                author: 'Ruskin Bond',
                isbn: '9781919920065',
                genre: 'Memoir',
                cover_image_url: 'https://covers.shakespeareandcompany.com/97801434/9780143454458.jpg',
                available_copies: 4,
                total_copies: 8,
                created_at: new Date('2024-10-03T13:08:29.000Z')
            },
            {
                title: 'Procrastination',
                author: 'Jane B. Burka',
                isbn: '9780738205115',
                genre: 'Self-Help',
                cover_image_url: 'https://dez1v4fbcawql.cloudfront.net/product/2227962/12588247/64d958b695767.jpg',
                available_copies: 2,
                total_copies: 4,
                created_at: new Date('2024-10-03T13:08:29.000Z')
            },
            {
                title: 'Lateral Thinking',
                author: 'Edward De Bono',
                isbn: '9780140138004',
                genre: 'Self-Help',
                cover_image_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1636367524i/829616.jpg',
                available_copies: 5,
                total_copies: 10,
                created_at: new Date('2024-10-03T13:08:29.000Z')
            },
            {
                title: 'Eat That Frog',
                author: 'Brian Tracy',
                isbn: '9781626569411',
                genre: 'Self-Help',
                cover_image_url: 'https://assets2.panuval.com/image/cache/catalog/1647/eat-that-frog-10022178-550x550h.jpeg',
                available_copies: 2,
                total_copies: 7,
                created_at: new Date('2024-10-03T13:08:29.000Z')
            }
        ];

        // Insert dummy data into the database
        await Book.bulkCreate(books);
        console.log('Dummy data for books table inserted successfully.');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    }
};

// Execute the seeding function
seedBooks().then(() => process.exit()).catch((error) => {
    console.error('Error executing seed:', error);
    process.exit(1);
});
