// We create an index.js file and then require all the packages we installed.
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const products_controller = require('./products_controller');

const app = express();
app.use( bodyParser.json() );

// Using the CONNECTION_STRING, we can invoke massive and pass it in as the first argument. This will return a promise.
massive( process.env.CONNECTION_STRING)
    .then( dbInstance => {
    app.set('db', dbInstance)
    // dbInstance.create_product_table()
} ).catch( err => console.log(err) );

//Endpoints- that will call the methods on our controller.
app.post( '/api/products', products_controller.create );
app.get( '/api/products', products_controller.getAll );
app.get( '/api/products/:id', products_controller.getOne );
app.put( '/api/products/:id', products_controller.update );
app.delete( '/api/products/:id', products_controller.delete );

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Server listening on port ${port}.`); } );
// After you created the port you want your server to listen to make sure to test it.
// Go into the root folder "node-2-afternoon" and type in nodemon server/