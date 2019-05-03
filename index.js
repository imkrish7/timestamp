
const express = require('express');
const app = express();
app.use(express.static('public'));

var PORT=3000;
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});
var validate = (date) => {

    var pattern = /^\d{4}[/\/-]\d{2}[/\/-]\d{2}$/;

    if (date.match(pattern)) {
        date = new Date(date);
        var d = new Date(+date[0], +date[1] - 1, +date[2]);
        if (+date[1] > 12) {
            return { 'error': "Invalid Date" }
        }
        
        return { unix: Math.round(d.getTime() / 1000), utc: d.toUTCString() };
    }
    else if (new Date(+date !== "Invalid Date")) {
        return { unix: +date, utc: new Date(+date).toUTCString() }

    }
    else {
        return { error: "Invalid Date" }
    }
}
app.get('/api/timestamp/', (req, res) => {

    res.send({ unix: Math.round(new Date().getTime() / 1000), utc: new Date().toUTCString() });
})
app.get('/api/timestamp/:date', (req, res) => {
    var { date } = req.params;

    res.send(validate(date));
})

app.get((req, res) => {
    res.send("Error 404 page Not found");
})
// listen for requests :)
const listener = app.listen(PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
