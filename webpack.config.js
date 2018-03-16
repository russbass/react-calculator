const path = require('path'); // import Node.js path module for path related operations
// create our config object
const config = {
    entry: path.join(__dirname, '/client/index.js'), // Absolute path to the entry file
    output: { // our output configuration...
        path: path.join(__dirname, './public/'), // output path to the (directory/folder)
        filename: 'bundle.js' // output bundled file name
    },
    module: { // Define loaders here
        rules: [ // array of rules to handle different file types
            {
                test: /\.(js|jsx)$/, // check for .js and .jsx files (uses Regex)
                loader: 'babel-loader' // use these loaders for .js and .jsx files
            }
        ]  
    }
};


// export our config object.
// You may have noticed we are using es5 synta here... Webpack expects it. 
module.exports = config;