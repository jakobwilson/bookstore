import { Query } from "..";
import { Book } from "../../types";

const getAll = () => Query<Book[]>('SELECT * FROM Books');
const getOne = (id: number) => Query<Book[]>('SELECT * FROM Books WHERE id=?', [id]);

const create = (title: string, author: string, price: number, categoryid: number) => 
    Query('INSERT INTO Books (title, author, price, categoryid) VALUES (?, ?, ?, ?)', [title, author, price, categoryid]);

const update = (id: number, title: string, author: string, price: number, categoryid: number) => 
    Query('UPDATE Books SET title=?, author=?, price=?, categoryid=? WHERE id=?', [title, author, price, categoryid]);

const destroy = (id: number) => Query('DELETE FROM Books WHERE id=?', [id]);

export default {
    getAll,
    getOne,
    create,
    update,
    destroy
};
