import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { fetcher } from '../services/fetcher';
import { Book, Category } from '../types';

const Edit = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState<Book>();
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [categoryid, setCategoryid] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {



        fetcher<Category[]>(`/api/categories`)
        .then((data) => setCategories(data))
        .catch((errorMessage) => alert(errorMessage));

        fetcher<Book>(`/api/books/${id}`)
        .then((data) => {
            setBook(data);
            setTitle(data.title);
            setAuthor(data.author);
            setCategoryid(data.categoryid);
            setPrice(data.price);
        })
        .catch((errorMessage) => alert(errorMessage));
    }, [id]);

    const handleDelete = () => {
        fetcher(`/api/books/${id}`, 'DELETE')
        .then(() => nav(`/`))
        .catch((errorMessage) => alert(errorMessage));
    }

    const handleUpdate = () => {
        fetcher(`/api/books/${id}`, 'PUT', { title, author, price, categoryid })
        .then(() => nav(`/books/${id}`))
        .catch((errorMessage) => alert(errorMessage));
    }

    if (!book) return <></>;
    
    return <div className='row justify-content-center'>
        <div className="col-12 col-9">
            <div className="shadow-lg m-2 p-3 rounded-3">
            <label>Title:</label>
            <input className='form-control' value={title} onChange={e => setTitle(e.target.value)} />
            <label>Author:</label>
            <input className='form-control' value={author} onChange={e => setAuthor(e.target.value)} />
            <label>Price:</label>
            <input className='form-control' value={price} type= "number" onChange={e => setPrice(Number(e.target.value))} />
            <select className='btn mt-2' value={categoryid} onChange={(e) => setCategoryid(Number(e.target.value))}> 
            <option value={0}>Choose a category</option>
            {categories.map(cat => (<option value={cat.id} key={`cat-option-${cat.id}`}> {cat.name} </option>))}
            </select>
            <button onClick={handleDelete} className='btn m-3'>Delete</button>
            <button onClick={handleUpdate} className="btn">Save Updates</button>
            </div>
            <div>
                <Link className="btn m-2" to='/'>Home</Link>
            </div>
        </div>
    </div>
};

export default Edit;
