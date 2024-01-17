import passport from "passport";
import LocalStrategy from "passport-local";
import JwtStrategy from "passport-jwt";
import { Express } from "express";
import config from "../config";
import database from "../database";
import { compare } from '../utils/bcrypt';


export const configurePassport = (app: Express) => {
    passport.use(
        new LocalStrategy.Strategy(
            {
                usernameField: "email",
            },
            async (email, password, done) => {
                try {
                    const [user] = await database.users.getOne(email);
                    if(!user) { 
                        console.log('user doesnt exist')
                        return done('Invalid login', false);

                    }
                    const isAMatch = compare(password, user.password);
                    if (!isAMatch) {
                        console.log('user password doesnt match')
                        return done ('Invalid login.', false);
                    }
                    done( null, user);
                } catch (error) {
                    console.log(error)
                    done(error, false);
                }
            }
        )
    );

    passport.use(
        new JwtStrategy.Strategy(
            {
                secretOrKey: config.jwt.secret,
                jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
            },
            (payload, done) => {
                done(null, payload);
            }
        )
    );

    app.use(passport.initialize());
};


