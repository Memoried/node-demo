// 抓取豆瓣读书中的书籍信息

const axios = require('axios').default;
const cheerio = require('cheerio');
const Book = require('../model/Book');

async function getBookHtml() {
    const resp = await axios.get('https://book.douban.com/latest');

    return resp.data;
}

/**
 * 从豆瓣读书中得到一个完整的网页，并从网页中分析出书籍的基本信息，然后得到一个书籍的详情页链接数组 
 */

async function getBookList() {
    const html = await getBookHtml();
    const $ = cheerio.load(html);
    const achorElements = $('#content .grid-12-12 li .cover');
    const links = achorElements.map((i, ele) => ele.attribs['href']).get();

    return links;
}

/**
 * 根据书籍详情页的地址，得到书籍详情
 */

 async function getBookDetail(url) {
     const resp = await axios.get(url);
     const $ = cheerio.load(resp.data);
     const name = $('h1 span').text();
     const imgUrl = $('#mainpic .nbg img').attr('src');
     const spans = $('#info span.pl');
     const authorSpan = spans.filter((i, ele) => {
         return $(ele).text().includes('作者');
     });
     const author = authorSpan.next('a').text();
     const publishSpan = spans.filter((i, ele) => {
         return $(ele).text().includes('出版年');
     });
     const publishDate = publishSpan[0].nextSibling.nodeValue.trim();

     return { name, imgUrl, author, publishDate };
 }

 /**
  * 获取所有书籍信息
  */
 async function fetchAll() {
     const links = await getBookList();
     const proms = links.map(link => getBookDetail(link));

     return Promise.all(proms);
 }

/**
 * 保存到数据库
 */
async function saveToDB() {
    const books = await fetchAll();

    await Book.bulkCreate(books);
    console.log('保存数据成功');
}
saveToDB();