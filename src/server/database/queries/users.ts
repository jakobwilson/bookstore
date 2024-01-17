import { Query } from "..";
import { User, NewUser } from "../../types";

const getOne = (email: string) =>Query<User[]>('SELECT * FROM Users WHERE email=?', [email]);
const create = (newUser: NewUser) => Query('INSERT INTO Users SET ?', [newUser]);

export default {
    getOne,
    create
};