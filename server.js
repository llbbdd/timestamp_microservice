var express = require('express');
var moment = require('moment');

var port = 8080;

var app = express();

app.get('/:query', function(req, res) {
    var time = req.params.query;
    
    if(isUnixTime(time)){
        var naturalTime = naturalFromUnixTime(time);
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ "unix": time, "natural": naturalTime }));
    }
    else if(isNaturalTime(time)){
        var unixTime = unixFromNaturalTime(time);
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ "unix": unixTime, "natural": time }));
    }
    else{
        var errorMessage = "Parameter passed is neither unix nor natural timestamp";
        console.log(errorMessage);
        new Error(errorMessage);
    }
    
    console.log(time);
});

app.listen(port, function () {
    console.log('Timestamp Microservice app listening on port ' + port);
});

function isUnixTime(unixTime){
    return !isNaN(parseFloat(unixTime)) && isFinite(unixTime);
}

function isNaturalTime(naturalTime){
    return false
}

function naturalFromUnixTime(unixTime){
    return moment().format('LL');
}

function unixFromNaturalTime(naturalTime){
    
}