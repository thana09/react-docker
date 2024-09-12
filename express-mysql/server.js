const express = require("express");
const cors = require('cors');
const mys = require('mysql2'); // You named it 'mys', not 'mysql'
const app = express();

app.use(cors());

var host = "localhost";
if (process.env.NODE_ENV == 'production'){
    host = 'mysql-server'
}

const connection = mys.createConnection({ // Use 'mys' here
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'travel',
});

app.get('/attractions', function (req, res) {
    connection.query(
        'SELECT * FROM attractions',
        function (err, results, fields) {
            if (err) {
                return res.status(500).send(err); // Handle errors properly
            }
            res.json(results); // Corrected syntax
        }
    );
});

app.route('/about').get((req, res) => {
    res.send('About Page'); // Corrected syntax
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server is running on port:', port);
});
