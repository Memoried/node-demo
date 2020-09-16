const fs = require('fs');
const path = require('path');

const from = path.resolve(__dirname,'./file/1.txt');
const to = path.resolve(__dirname,'./file/1.copy.txt');

async function method1(){
    console.time(1);
    const content = await fs.promises.readFile(from,'utf-8');
    await fs.promises.writeFile(to,'utf-8');
    console.timeEnd(1);
}
method2();
async function method2(){
    console.time(2);
    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to);
    rs.on('data',(chunk) => {
        const flag = ws.write(chunk);
        if(!flag){rs.pause()}
    })
    rs.on('end',() => console.timeEnd(2));
    ws.on('drain',() => {
        rs.resume();
    })
}

// const ws = fs.createWriteStream(from,{
//     encoding:'utf-8',
//     highWaterMark:16 * 1024
// });
// let i = 0;
// function write(){
//     let flag = true;
//     while (i < 1024 * 1024 * 10 && flag){
//         flag = ws.write('a');
//         i++;
//     }
// }

// ws.on('drain', () => {
//     write()
// });
// write();