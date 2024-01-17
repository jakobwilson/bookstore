import express, { response } from 'express';
import database from '../../database';
import passport from 'passport';
import { signToken } from '../../utils/jwts';
import { hash } from '../../utils/bcrypt';

const router = express.Router();

router.post('/login', passport.authenticate('local', { session: false }), async (req, res) => {
    const user = req.user!;
    try {
        const token = signToken({ id: user.id, name: user.name });

        res.json(token);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to login" });
    }
});


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = hash(password);

  try {
    const response = await database.users.create({ name, email, password:hashed });
    const token = signToken({ name, id: response.insertId })
    res.json({ message: 'Thanks for registering', token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "unable to register", error});
  }
})

export default router;
