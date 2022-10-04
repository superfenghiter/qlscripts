import got from 'got';

const url = 'https://www.baidu.com';
const response = await got(url);
console.log(response);
