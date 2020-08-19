const fs = require('fs');
const path = require('path');
const dirname = path.resolve(__dirname,'./file');
start();
async function readdir(dir){
    const pathes = await fs.promises.readdir(dir);
    let arr = [];
    for(let i = 0; i < pathes.length; i++){
        let obj = {};
        const stat = await fs.promises.stat(path.resolve(dir, pathes[i]));
        obj.name = pathes[i];//文件名
        obj.ext = path.extname(pathes[i]).substr(1);//后缀名
        obj.isFile = stat.isFile();//是否为一个文件
        obj.size = stat.size;//文件大小
        obj.createTime = new Date(stat.birthtime).toLocaleDateString();//创建时间
        obj.updateTime = new Date(stat.mtime).toLocaleDateString();//修改时间
        obj.getChildren = async function () {//得到目录的所有子文件对象，如果是文件，则返回空数组
            return this.isFile ? [] : await fs.promises.readdir(path.resolve(dir, pathes[i]));
        };
        obj.getContent = async function(isBuffer = false){//读取问价内容，如果是目录，则返回null
            let content = null;
            if(this.isFile){
                if(this.isBuffer){
                    content = await fs.promises.readFile(path.resolve(dir, pathes[i]))
                }else{
                    content = await fs.promises.readFile(path.resolve(dir, pathes[i]),'utf-8');
                }
            }
            return content;
        };
        arr.push(obj);
    }
    return arr;
}

async function start() {
    const arr = await readdir(dirname);
    const testdir =  await arr[2].getChildren();
    const testfile = await arr[0].getContent();
    console.log(testdir,testfile)
}

