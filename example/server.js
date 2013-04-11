var restify = require('restify'),
    nstatic = require('node-static'),
    fs = require('fs'),
    data = __dirname + '/data.json',
    server = restify.createServer(),
    file = new nstatic.Server('');


server.use(restify.bodyParser());

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
        
        // Check for existence
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

function save(params, res) {
    
    var mod = false;
    
    fs.readFile(data, 'utf8', function (err, dataMod) {
        if (err) {
            res.send(404, "ERROR: Could Not Load Data");
            return;
        }
        
        // Parse JSON
        var dataMod = JSON.parse(dataMod);
        
        // Check for existence
        for (var i=0, z=dataMod.length; i<z; i++) {
            if (dataMod[i].id==params.id) { // Matching ID
                mod = true;
                dataMod[i] = params;
            }
        }
        
        // Not found / modified in for-loop
        if (!mod) {
            dataMod[z] = params;
        }
        
        // Stringify data
        dataMod = JSON.stringify(dataMod, null, 4);
        
        // Save to file
        fs.writeFile(data, dataMod, function(err) {
            if(err) {
                res.send(404, 'ERROR: Could Not Write Changes');
            } else {
                res.send(200);
            }
        });
        
    });
    
    
}


/**
 * Process POST
 */
server.post('/api', function(req, res) {
    
    save(req.params, res);
    
});

/**
 * Process PUT
 */
server.put('/api', function(req, res) {
    
    save(req.params, res);
    
});

/**
 * Process DELETE
 */
server.del('/api/:id', function(req, res) {
    
    var dataRem = [];
    
    fs.readFile(data, 'utf8', function (err, dataMod) {
        if (err) {
            res.send(404, "ERROR: Could Not Load Data");
            return;
        }
        
        // Parse JSON
        var dataMod = JSON.parse(dataMod);
        
        // Check for existence & delete
        for (var i=0, z=dataMod.length; i<z; i++) {
            if (dataMod[i].id!=req.params.id) { // Matching ID
                dataRem[i] = dataMod[i];
            }
        }
        
        // Stringify data
        dataRem = JSON.stringify(dataRem, null, 4);
        
        // Save to file
        fs.writeFile(data, dataRem, function(err) {
            if(err) {
                res.send(404, 'ERROR: Could Not Write Changes');
            } else {
                res.send(200);
            }
        });
        
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
 * Start Server
 */
server.listen(8090);