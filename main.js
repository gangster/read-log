const fs       = require('fs');
const zlib     = require('zlib');
const readline = require('readline');

function extractIps(path, ips) {
     read(path)
    .on('line', parse(ips))
    .on('close', write(ips, "ips.txt"));
}

function read(path) {
    return readline.createInterface({
        input: fs.createReadStream(path).pipe(zlib.createGunzip())
    });
}

function parse(ips) {
    return (line) => {
        ip = line.split('\t')[3];
        if (ip != undefined && ip != "c-ip") {
            ips[ip] = true;
        }
    }
}

function write(ips, path) {
    return () => {
        file = fs.createWriteStream(path);
        file.on('error', (err) =>  { console.log(err) });
        Object.keys(ips).forEach((ip) => { file.write(ip + '\n'); });
    }
}

extractIps("log.gz", {});