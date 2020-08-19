const fs = require('fs');
const path = require('path');
const dirname = path.resolve(__dirname, './file');

start();
async function readdir(dir) {
    const pathes = await fs.promises.readdir(dir);
    let arr = [];
    for (let i = 0; i < pathes.length; i++) {
        const filename = path.resolve(dir, pathes[i]);
        arr.push(await File.getFile(filename));
    }
    return arr;
}

async function start() {
    const arr = await readdir(dirname);
    const testdir =  await arr[2].getChildren();
    const testfile = await arr[0].getContent();
    console.log(testdir,testfile)
}
class File {
    constructor(filename, name, ext, isFile, size, createTime, updateTime) {
        this.filename = filename;
        this.name = name;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
    async getChildren() {//得到目录的所有子文件对象，如果是文件，则返回空数组
        return this.isFile ? [] : await fs.promises.readdir(this.filename);
    }
    async getContent(isBuffer = false) {//读取问价内容，如果是目录，则返回null
        let content = null;
        if (this.isFile) {
            if (isBuffer) {
                content = await fs.promises.readFile(this.filename)
            } else {
                content = await fs.promises.readFile(this.filename, 'utf-8');
            }
        }
        return content;
    };
    static async getFile(filename) {
        const stat = await fs.promises.stat(filename);
        const name = path.basename(filename);//文件名
        const ext = path.extname(filename).substr(1);//后缀名
        const isFile = stat.isFile();//是否为一个文件
        const size = stat.size;//文件大小
        const createTime = new Date(stat.birthtime).toLocaleDateString();//创建时间
        const updateTime = new Date(stat.mtime).toLocaleDateString();//修改时间
        return new File(filename, name, ext, isFile, size, createTime, updateTime);
    }
}
