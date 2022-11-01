var express = require('express');
var app = express();
var fs = require("fs");


var user = {
    "starship11": {
        "name": "USS Prometheus",
        "registry": "NCC-59650",
        "class": "Prometheus",
        "type": "Multi-Vector Assault Cruiser (CT)",
        "commissioned": "2374",
        "commanding officer": "Garm Bel Iblis",
        "mission": "Patrol, Romulan Neutral Zone, Beta Quadrant"
    }
}

app.get('/listStarships', function (req, res) {
    fs.readFile(__dirname + "/" + "starships.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

app.get('/:name', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "starships.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        var user = users["starship" + req.params.id]
        console.log(user);
        res.end(JSON.stringify(user));
    });
})

app.post('/addShip', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "starships.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["starship11"] = user["starship11"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})