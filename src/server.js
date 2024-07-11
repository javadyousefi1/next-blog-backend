const express = require("express");
// cors
const cors = require("cors");
// error handling
const createError = require("http-errors");
const dotenv = require("dotenv");
// mongoos
const { default: mongoose } = require("mongoose");
// routes
const { allRoutes } = require("./routes/router");
// swagger
const SwaggerConfig = require("./config/swagger.config")
// cookie parser
const cookieParser = require('cookie-parser')
// path
const path = require('path')
// serv index
const serveIndex = require("serve-index");
// config env files on application
dotenv.config();

class Application {
    #app = express();
    #PORT = process.env.PORT || 5000;
    #DB_URI = process.env.MONGO_DB_URL;

    constructor() {
        this.createServer();
        this.connectToDB();
        this.initClientSession();
        this.configRoutes();
        this.errorHandling();
        this.configServer();
    }
    createServer() {
        this.#app.listen(this.#PORT, () =>
            console.log(`listening on port ${this.#PORT}`)
        );
    }
    connectToDB() {
        mongoose
            .connect(this.#DB_URI)
            .then((res) => console.log("MongoDB connected!!"))
            .catch((err) => console.log("Failed to connect to MongoDB", err));
    }
    configServer() {
        this.#app.use(
            cors({ credentials: true, origin: process.env.ALLOW_CORS_ORIGIN })
        );
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use("/uploads", express.static(path.join(__dirname, '../uploads')));
        app.use("/uploads", serveIndex("../uploads", { icons: true }));

        SwaggerConfig(this.#app)
    }
    configRoutes() {
        this.#app.use("/api", allRoutes);
    }
    initClientSession() {
        this.#app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
    }
    errorHandling() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound("not found route"));
        });
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError();
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({
                statusCode,
                message,
            });
        });
    }
}

module.exports = Application;