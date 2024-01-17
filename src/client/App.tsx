import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import BookDetails from "./views/BookDetails";
import Edit from "./views/EditBooks";
import Login from "./views/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/:id/edit" element={<Edit />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
