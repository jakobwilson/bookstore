import passport from "passport";
import LocalStrategy from "passport-local";
import JwtStrategy from "passport-jwt";
import { Express } from "express";
import config from "../config";
import database from "../database";
import { compare } from "bcrypt";

export const configurePassport = (app: Express) => {
    passport.use(
        new LocalStrategy.Strategy(
            {
                usernameField: "email",
            },
            async (email, password, done) => {
               try {
                const[user] = await database.users.getOne(email);
                if(!user) {
                    console.log('no user')
                    return done('Invalid login', false);
                }

                const checkMatch = compare(password, user.password);
                if (!checkMatch) {
                    console.log('wrong password')
                    return done('Invalid login.');
                }
                done(null, user);

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
