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

const app = express();
const PORT = 3000;

const schemaPath = path.join(path.resolve(), 'graphql', 'schema.graphql');
const typeDefs = fs.readFileSync(schemaPath, 'utf8');

app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
    schema: buildSchema(typeDefs),
    rootValue: resolvers,
    graphiql: true
}));

ConnectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`I'm listening on http://localhost:3000`);
    });
});
