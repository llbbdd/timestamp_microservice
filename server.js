var express = require('express');
var moment = require('moment');

var port = 8080;

var app = express();

app.get('/:query', function(req, res, next) {
    var time = req.params.query;
    
    res.setHeader('Content-Type', 'application/json');
    
    if(isUnixTime(time)){
        var naturalTime = naturalFromUnixTime(time);
        
        res.send(JSON.stringify({ "unix": time, "natural": naturalTime }));
    }
    else if(isNaturalTime(time)){
        var unixTime = unixFromNaturalTime(time);
        
        res.send(JSON.stringify({ "unix": unixTime, "natural": time }));
    }
    else{
        res.send(JSON.stringify({ "unix": null, "natural": null }));
    }
});

app.listen(port, function () {
    console.log('Timestamp Microservice app listening on port ' + port);
});

function isUnixTime(unixTime){
    return !isNaN(parseFloat(unixTime)) && isFinite(unixTime);
}

function isNaturalTime(naturalTime){
    return moment(naturalTime).isValid();
}

function naturalFromUnixTime(unixTime){
    return moment.unix(unixTime).format('LL');
}

function unixFromNaturalTime(naturalTime){
    return moment(naturalTime).format("X");
}