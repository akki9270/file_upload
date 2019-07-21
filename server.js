const express = require('express');
const bodyParser = require('body-parser');
const UPLOAD_PATH = '/Volumes/DATA/MyData/blog_projects/node_file_upload/upload/';

// form parse module
const formidable = require('formidable');

// node module to access file system
const fs = require('fs')

// initialize express
const app = express();

// parse data to json format
// to easily access and manipulate
app.use(bodyParser.json());

// specify the root for the directory
// and assets to serve
app.use(express.static(__dirname + '/public'))

app.post('/api/upload', function (req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            // return form Parse error
            res.sendStatus(500);
        }

        let oldpath = files.file.path;
        let newpath = UPLOAD_PATH + files.file.name;

        fs.readFile(oldpath, function (err, data) {
            if (err) throw err;
            console.log('File read!');

            // Write the file
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
                console.log('File written!');
            });

            // Delete the file
            fs.unlink(oldpath, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        });
    });
})

// forward all other request to front-end
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// start listining on port 8000
app.listen(8000, function () {
    console.log('Magic Happens on Port 8000')
});