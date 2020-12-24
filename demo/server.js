const express = require('express');
const fileUpload = require('express-fileupload');
const { exec } = require('child_process');
const app = express();
app.use('/output', express.static('output'));
app.use('/images', express.static('images'));
const PORT = 8081;
app.use('/index.html', express.static(__dirname + '/index.html'));
app.use('/output.html', express.static(__dirname + '/output.html'));
app.use('/samples.html', express.static(__dirname + '/samples.html'));

// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
    res.send('pong');
});

app.post('/upload', function(req, res) {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    console.log('req.files >>>', req.files); // eslint-disable-line

    sampleFile = req.files.sampleFile;

    uploadPath = __dirname + '/uploads/input_image.png';

    sampleFile.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        //res.send('File uploaded to ' + uploadPath);
        res.redirect('/segmentCloud');
    });
});

app.get('/segmentCloud', function(req, res) {
    console.log(req.params.name);
    query = `cd .. && matlab -batch segmentCloud('./demo/uploads/input_image.png')`;

    exec(query, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        // res.send(stdout);
        res.redirect('/output.html');
    });
});

app.get('/segmentCloud9999', function(req, res) {
    console.log(req.params.name);
    for (var i = 1; i <= 115; i++) {
        var name = ("000" + i).substr(-3);
        query = `cd .. && matlab -batch segmentCloud9999('./demo/images/sample/images/${name}.jpg')`;

        exec(query, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            // res.send(stdout);
            res.redirect('/output.html');
        });
    }

});

app.listen(PORT, function() {
    console.log('Express server listening on port ', PORT); // eslint-disable-line
});