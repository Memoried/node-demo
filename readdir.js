const fs = require('fs');
const path = require('path');
const dirname = path.resolve(__dirname, './file');


async function readdir(dirname) {
    const file = await File.getFile(dirname);
    console.log(file);
    console.log(await file.getChildren());
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
        if(this.isFile) return [];
        let children = await fs.promises.readdir(this.filename);
        children = children.map(name => {
            const filename = path.resolve(this.filename, name);
            return File.getFile(filename);
        })
        return Promise.all(children);
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

readdir(dirname);
