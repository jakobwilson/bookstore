import express from "express";
import cors from "cors";
import router from "./routes";
import { configurePassport } from "./middlewares/passport";

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const app = express();
configurePassport(app);

if (isDevelopment) {
    app.use(cors());
}

if (isProduction) {
    app.use(express.static("public"));
}

app.use(express.json());

// all our api routes
app.use(router);

// 404 fallback for client side routing
if (isProduction) {
    app.get("*", (req, res) => {
        res.sendFile("index.html", { root: "public" });
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
