import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';

/**
 * function that is used as a callback to the http.createServer method
 * it handles the incoming requests and sends the response....
 */

 function requestHandler(request, response) {
     //resolve the path to the requested resource and assing it to a variable
     let requestedResource = path.join(
         __dirname, //current dir where server.js is found
        '../public', // step out of this directory into the public directory
         url.parse(request.url).pathname //path to resource requested
     );

     // use exists method of the fs module to check if requestedResource exists
     
     fs.exists(requestedResource, function(exists){
        // check if file doesn't exist and return a 400 status (File not found)
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        // Check if the requested resource is a directory. If it is, 
        // If it is, set Index.html page as the requested resource. 

        if(fs.statSync(requestedResource).isDirectory()) {
            requestedResource += '/index.html';
        }

        //Finally, we read the requested file (asynchronously) and 
        // send its content to the client.

        fs.readFile(
            requestedResource, // path to requested resource
            "binary", // read the requested resource as a binary file
            function(err, file) {// call back function to handle end of file reading
            
            // If  an error occurred while reading the file, send the error message
            // with a status code of 500 (Internal server error)

            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }
            
            //Helper object to map requested content types (extension) to the response
            // mime types

            const contentTypesByExtension = {
                '.html': "text/html",
                '.css': "text/css",
                '.js': "text/javascript"
            };

            // Helper object to hold our headers
            const headers = {};
            // get the content type using the requested resource file extension
            const contentType = contentTypesByExtension[
                path.extname(requestedResource)
            ];

            // if the requested resource maps to any of our content type extension,
            // then set the Content-Type field for our response headers.
            if(contentType) {
                headers["Content-Type"] = contentType;
            }

            response.writeHead(200, headers); // write response header (if any)
            response.write(file, "binary"); // write content of read file (binary format)
            response.end(); //send response and close request
        });
     });
 }

 //create an instance of our server(http) and passing in our request handler
 const server = http.createServer(requestHandler);
 //declare our port number
 const portNumber = 3030;
 // setup our server to start listening on the port we specified
 server.listen(portNumber, function(){
     //log to our console, so we know our server is up and running. 
     console.log(`Server Listening on port ${portNumber}`);
 });