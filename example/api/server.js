var restify = require('restify');

var server = restify.createServer({
  name: 'TestServer',
});

server.get('/', function(req, res) {
    
    console.log('GET METHOD.');
    
    res.send('GET SUCCESSFUL');
    
});

server.post('/', function(req, res) {
    
    console.log('POST METHOD.');
    
    res.send('POST SUCCESSFUL');
    
});

server.put('/', function(req, res) {
    
    console.log('PUT METHOD.');
    
    res.send('PUT SUCCESSFUL');
    
});

server.del('/', function(req, res) {
    
    console.log('DELETE METHOD.');
    
    res.send('DELETE SUCCESSFUL');
    
});

server.listen(8080);