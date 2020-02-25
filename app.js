'use strict';

let express = require('express');
let mysql = require("mysql");

let dbhost = process.env['DBHOST'] || 'localhost';

function getConnection() {
    return mysql.createConnection({
    "host": dbhost,
    "port": 3306,
    "user": "mysql",
    "password": "mysql",
    "database": "mydb"
    });
}

let app = express();

app.get('/', function (req, res) {
    res.redirect('/registrations');
});

app.get('/reglist', function (req, res) {
    let connection = getConnection();
    connection.connect(function (err) {
        if (err) {
            console.log("Problem connecting to database", err);
            res.send("Unable to connect to database! " + err);
            return;
        }
        connection.query("SELECT * FROM Registrations", function (err, results) {
            if (err) {
                res.send("Error! " + err)
            }
            res.send(results);
            connection.destroy();
        });
    });    
});

// http://172.31.87.117:8888/registration?firstName=Nathan&lastName=Swaim&grade=9&email=nswai983&shirtSize=M&hrUsername=nswai983

app.post('/registration', function (req, res) {
    let firstName = req.body.firstName || "";
    let lastName = req.body.lastName || "";
    let grade = req.body.grade || "";
    let email = req.body.email || "";
    let shirtSize = req.body.shirtSize || "";
    let hrUsername = req.body.hrUsername || "";
    let errMsg;

    firstName = firstName.trim();
    lastName = lastName.trim();
    hrUsername = hrUsername.trim();

    if (firstName == '' || lastName == '')
    {
        errMsg = "Please supply first and last name.";
    }

    if ((grade == '') || (grade != '9') || (grade != '10') || (grade != '11') || (grade != '12'))
    {
        errMsg = "Please enter grade (9, 10, 11, 12).";
    }

    if (email == '')
    {
        errMsg = "Please enter email.";
    }

    if ((shirtSize == '') || (shirtSize != 'S') || (shirtSize != 'M') || (shirtSize != 'L'))
    {
        errMsg = "Please enter your shirt size (S, M, L).";
    }

    if (hrUsername == '')
    {
        errMsg = "Please enter your hackerrank username.";
    }

    if (errMsg) {
        res.status(400).send( {error: errMsg} );
        console.log("hello")
    }

    let connection = getConnection();
    connection.connect(function (err) {
        if (err) {
            console.log("Problem connecting to database", err);
            res.send("Unable to connect to database! " + err);
            return;
        }
        connection.commit(`UPDATE Registrations VALUES (${firstName}, ${lastName}, ${grade}, ${email}, ${shirtSize}, ${hrUsername})`, function (err, results) {
            if (err) {
                res.send("Error! " + err)
            }
            connection.destroy();
        });
    });

});

let port = process.env['PORT'] || 8888;
port = parseInt(port)
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});
