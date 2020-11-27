const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema.js');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://felipeeu:fevi2406@clusterfelipe-kdk6j.mongodb.net/test?retryWrites=true", {useUnifiedTopology: true});

let port = process.env.PORT || 4000;

const app = express();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',()=>{console.log('connect to database')});

app.use(cors());

app.use('/', graphqlHTTP({
    schema: schema,
    graphiql: true //set to false if you don't want graphiql enabled
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);
