import { Query } from "..";
import { Category } from "../../types";

const getAll = () => Query<Category[]>('SELECT * FROM Categories');

export default {
    getAll
};