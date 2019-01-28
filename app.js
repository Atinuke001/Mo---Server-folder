const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose=require('mongoose');
const cors = require('cors');

const app = express();

//allow cors-originrequests
app.use(cors());

mongoose.connect('mongodb://Akinyemi:Atinuke001@ds213705.mlab.com:13705/radioprofile');
mongoose.connection.once('open',()=>{
  console.log('conected to database');
});
// bind express with graphql
app.use('/graphql',graphqlHTTP({
  schema,
  graphiql:true

}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
