import { Query } from "..";
import { User, NewUser } from "../../types";

const getOne = (email: string) =>Query<User[]>('SELECT * FROM USERS WHERE email=?', [email]);
const create = (newUser: NewUser) => Query('INSERT INTO USERS SET ?', [newUser]);

export default {
    getOne,
    create
};