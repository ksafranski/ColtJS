/**
 * 
 * Dev NodeJS Script for testing basic REST calls - GET, POST, PUT, DELETE
 * 
 * Place in root of site, create data.json in root with following format:
 * [
 *     {
 *          id: "1",
 *          ...additional params...
 *     },
 *     ...
 * ]
 * 
 * Default port 8090
 * 
 * Static content served from yourserver:8090,
 * API calls made to yourserver.com:8090/api
 * 
 * GET & DELETE accept yourserver.com/api/:id
 * 
 */

var restify = require('restify'),
    nstatic = require('node-static'),
    fs = require('fs'),
    data = __dirname + '/data.json',
    server = restify.createServer(),
    file = new nstatic.Server('');


// Allows for access of POST & PUT data through req.params
server.use(restify.bodyParser());

/**
 * Handler for PUT and POST methods
 */
function doPutPost(params, res) {
    
    var mod = false;
    
    fs.readFile(data, 'utf8', function (err, dataMod) {
        if (err) {
            res.send(404, "ERROR: Could Not Load Data");
            return;
        }
        
        // Parse JSON
        dataMod = JSON.parse(dataMod);
        
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
        
        writeToFile(dataMod, res);
        
    });
   
}

/**
 * Write data back to file
 */
function writeToFile(input, res) {
    // Stringify data
    input = JSON.stringify(input, null, 4);
    
    // Save to file
    fs.writeFile(data, input, function(err) {
        if(err) {
            res.send(404, 'ERROR: Could Not Write Changes');
        } else {
            res.send(200);
        }
    });
}

/**
 * Process GET Request
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

/**
 * Process POST Request
 */
server.post('/api', function(req, res) {
    
    doPutPost(req.params, res);
    
});

/**
 * Process PUT Request
 */
server.put('/api', function(req, res) {
    
    doPutPost(req.params, res);
    
});

/**
 * Process DELETE Request
 */
server.del('/api/:id', function(req, res) {
    
    fs.readFile(data, 'utf8', function (err, dataMod) {
        if (err) {
            res.send(404, "ERROR: Could Not Load Data");
            return;
        }
        
        // Parse JSON
        dataMod = JSON.parse(dataMod);
        
        // Check for existence & delete
        for (var i=0, z=dataMod.length; i<z; i++) {
            if (dataMod[i].id==req.params.id) { // Matching ID
                dataMod.splice(i,1);
                break;
            }
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