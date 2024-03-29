import mysql, { ResultSetHeader } from 'mysql2/promise';
import config from '../config';
import books from './queries/books';
import categories from './queries/categories';
import users from './queries/users';

const pool = mysql.createPool(config.mysql);

export const Query = async <T = ResultSetHeader>(sql: string, values?: unknown[]) => {
    const [rows] = await pool.query(sql, values);
    return rows as T;
};

export default {
    books,
    categories,
    users
};