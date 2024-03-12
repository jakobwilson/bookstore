import React, { useState, useEffect } from "react";
import { Book } from "../types";
import { fetcher } from "../services/fetcher";
import { Link, useParams } from "react-router-dom";

const BookDetails = () => {
    const { id } = useParams();
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    fetcher(`/api/books/${id}`)
      .then((data) => setBook(data))
      .catch((errorMessage) => alert(errorMessage));
  }, [id]);

  if (!book) return <></>

  return (
    <div>
      <div className="row justify-content-center">
          <div className="col-12 col-md-9" key={`book-card-${book.id}`}>
            <h1 className="display-1 text-center">Book Details</h1>
            <div className="card shadow-lg p-3 m-2">
              <h1 className="booktitle">{book.title}</h1>
              <h2 className="bookauthor">{book.author}</h2>
              <p className="bookprice">${book.price}</p>
              <Link className="btn m-2" to={`/books/${book.id}/edit`}>Edit</Link>
              <Link className="btn m-2" to='/'>Back</Link>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default BookDetails;

