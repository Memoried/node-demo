const http = require('http');
const URL = require('url');
const path = require('path');
const fs = require('fs');

const server = http.createServer(handler);
server.on('listening',() => {
    console.log('server listen 6100');
})

server.listen(6100)

async function handler(req,res){
    const contentPath = await getFileContent(req.url);
    if(contentPath){
        const content = await fs.promises.readFile(contentPath);
        res.write(content);
    }else{
        res.write('Not Found');
        res.statusCode = 404;
    }
    res.end();
}

async function getFileContent(url){
    const pathName = URL.parse(url).pathname;
    const fileName = path.resolve(__dirname,'public',pathName.substr(1));
    const stat = await exists(fileName);
    if(!stat){
        return null
    }else if(stat.isDirectory()){
        const sonFileName = path.resolve(__dirname, 'public', pathName.substr(1),'index.html');
        const sonStat = await exists(sonFileName);
        if(!sonStat){
            return null
        }else{
            return sonFileName;
        }
    }else{
        return fileName;
    }
}

async function exists(filename){ 
    try{
        return await fs.promises.stat(filename);
    }catch{
        return null;
    }
}