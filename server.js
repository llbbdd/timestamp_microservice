var express = require('express');
var moment = require('moment');

var port = 8080;

var app = express();

app.get('/:query', function(req, res) {
    var time = req.params.query;
    
    res.setHeader('Content-Type', 'application/json');
    
    if(isUnixTime(time)){
        sendResponse(res, time, naturalFromUnixTime(time))
    }
    else if(isNaturalTime(time)){
        sendResponse(res, unixFromNaturalTime(time), time);
    }
    else{
        sendResponse(res, null, null);
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

function sendResponse(response, unixTime, naturalTime){
    response.send(JSON.stringify({ "unix": unixTime, "natural": naturalTime }));
}