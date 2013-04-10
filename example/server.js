var restify = require('restify'),
    nstatic = require('node-static'),
    fs = require('fs'),
    data = __dirname + '/data.json',
    server = restify.createServer();


// Process GET
server.get('/api/:id', function(req, res, next) {

    var id = req.params.id,
        pass = false,
        sendback;
        
    
    fs.readFile(data, 'utf8', function (err, data) {
        if (err) {
            res.send(404, "Could Not Load Data");
            return;
        }
        
        // Parse JSON
        data = JSON.parse(data);
        
        console.log(data);
        
        // Check auth
        for (var i=0, z=data.length; i<z; i++) {
            if(data[i].id==id){ // Matching email
                pass = true;
                sendback = data[i];
            }
        }
        
        if (pass) {
            res.send(200, sendback);
        }else{
            res.send(404, "No Match");
        }
        
        
    });
    
});


// Serve static files
var file = new nstatic.Server('');
server.get(/^\/.*/, function(req, res, next) {
    file.serve(req, res, next);
    return next();
});


// Process POST
server.post('/api/:id', function(req, res) {
    
    console.log('POST METHOD.');
    
    res.send('POST SUCCESSFUL');
    
});

// Process PUT
server.put('/api/:id', function(req, res) {
    
    console.log('PUT METHOD.');
    
    res.send('PUT SUCCESSFUL');
    
});

// Process DELETE
server.del('/api/:id', function(req, res) {
    
    console.log('DELETE METHOD.');
    
    res.send('DELETE SUCCESSFUL');
    
});

server.listen(8090);