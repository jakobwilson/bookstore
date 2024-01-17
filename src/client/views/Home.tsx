import React, {useState, useEffect} from 'react'
import { Book } from '../types'
import { fetcher } from '../services/fetcher';
import { Link } from 'react-router-dom';

const Home = () => {
    const [books, setBooks] =useState<Book[]>([]);

    useEffect(() => {
        fetcher('/api/books')
        .then(data => setBooks(data))
        .catch(errorMessage => alert(errorMessage));
    }, [])

  return (
    <div>
       <nav className='navbar navabar-expand-lg'>
            <div className='container-fluid'>
                <h2 className='title'>Bookstore</h2>
                <Link className="btn" to='/post'>Post</Link>
                <Link className='btn' to='/login'>Login</Link>
            </div>
        </nav>

        <div className='row justify-content-center'>
        {books.map((book) => (
            <div className='col-12 col-md-6' key={`book-card-${book.id}`}>
                <div className="card shadow-lg p-3 m-2">
                    <h1>{book.title}</h1>
                    <h2>{book.author}</h2>
                    <p>${book.price}</p>
                    <Link className='btn' to={`/books/${book.id}`}>More Info</Link>
                </div>
            </div>
        ))}
    </div>
    </div>
  )
};

export default Home;
