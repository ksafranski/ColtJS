var restify = require('restify'),
    nstatic = require('node-static'),
    fs = require('fs'),
    data = __dirname + '/data.json',
    server = restify.createServer(),
    file = new nstatic.Server('');


/**
 * Process GET
 */
server.get('/api/:id', function(req, res, next) {

    var id = req.params.id,
        pass = false,
        sendback;
        
    
    fs.readFile(data, 'utf8', function (err, data) {
        if (err) {
            res.send(404, "ERROR: Could Not Load Data");
            return;
        }
        
        // Parse JSON
        data = JSON.parse(data);
        
        // Check auth
        for (var i=0, z=data.length; i<z; i++) {
            if (data[i].id==id) { // Matching ID
                pass = true;
                sendback = data[i];
            }
        }
        
        if (pass) {
            res.send(200, sendback);
        } else {
            res.send(404, "ERROR: No Match");
        }
        
        
    });
    
});


/** 
 * Serve static files
 */
server.get(/^\/.*/, function(req, res, next) {
    file.serve(req, res, next);
    return next();
});


/**
 * Process POST
 */
server.post('/api/:id', function(req, res) {
    
    console.log('POST METHOD.');
    
    res.send('POST SUCCESSFUL');
    
});

/**
 * Process PUT
 */
server.put('/api/:id', function(req, res) {
    
    console.log('PUT METHOD.');
    
    res.send('PUT SUCCESSFUL');
    
});

/**
 * Process DELETE
 */
server.del('/api/:id', function(req, res) {
    
    console.log('DELETE METHOD.');
    
    res.send('DELETE SUCCESSFUL');
    
});


/**
 * Start Server
 */
server.listen(8090);