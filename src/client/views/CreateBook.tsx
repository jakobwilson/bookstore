import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetcher } from '../services/fetcher';
import { Category } from '../types';

const CreateBook = () => {
    const nav = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [categoryid, setCategoryid] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetcher<Category[]>(`/api/categories`)
        .then((data) => setCategories(data))
        .catch((errorMessage) => alert(errorMessage));
   
    }, []);

    const handleCreate = () => {
        fetcher(`/api/books`, 'POST', { title, author, price, categoryid })
        .then((data) => nav(`/books/${data.id}`))
        .catch((errorMessage) => alert(errorMessage));
    };
    
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
            <button onClick={handleCreate} className="btn">Post</button>
            </div>
            <div>
                <Link className="btn m-2" to='/'>Home</Link>
            </div>
        </div>
    </div>
};

export default CreateBook;