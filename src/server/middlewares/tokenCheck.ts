import passport from "passport";
import { RequestHandler } from "express";
import { Payload } from "../types";

export const tokenCheck: RequestHandler = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err: Error, user: Payload, info: any ) => {
        if (err) {
            return res.status(401).json({ message: "Banned lol", err });
        }
        
        if (!user) {
            return res.status(401).json({ message: "Must be logged in", info });
        }

        req.user = user;
        next();
    })(req, res, next);
};
