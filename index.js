import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { resolvers } from "./graphql/resolvers.js";
import Event from './models/events.js';
import User from './models/user.js';
dotenv.config();
import { ConnectDb } from "./lib/db.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

const schemaPath = path.join(path.resolve(), 'graphql', 'schema.graphql');
const typeDefs = fs.readFileSync(schemaPath, 'utf8');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authMiddleware);

app.use('/graphql', graphqlHTTP((req, res) => ({
    schema: buildSchema(typeDefs),
    rootValue: resolvers,
    graphiql: true,
    context: { user: req.user, res }
})));

ConnectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`I'm listening on http://localhost:3000`);
    });
});
