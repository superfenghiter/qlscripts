import got from 'got';

const test = async () => {
    const url = 'https://www.baidu.com';
    const response = await got(url);
    console.log(response);
}

test();
