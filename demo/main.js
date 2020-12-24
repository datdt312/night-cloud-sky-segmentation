const { exec } = require('child_process');

async function segmentCloud(imgpath) {
    query = `cd .. && matlab -batch segmentCloud('./images/undist/2016-05-10-02-02-04-wahrsis3-undist.jpg')`;

    exec(query, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        return "done";
    });
}

exports.segmentCloud = segmentCloud;