import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import path from 'path';
import _ from 'lodash';
import curlirize from 'axios-curlirize';
import FormData from 'form-data';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'story.json');
const oldFilePath = path.join(__dirname, 'newList.json');

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiQURNSU4iLCJuYW1lIjoiaWthcnVzIiwiaWQiOiJjNGMxNGYyYi0wNjgyLTQzNDgtYTU4Mi01OGMwOTU1N2YwOTUiLCJleHAiOjE3MzI2Nzk4NDgsImlhdCI6MTczMjA3NTA0OH0.LctA2LUH5iKxuRlvI_aEBBaOtwJruoETnrTQajB6-9bUTM_dgYaRh6sABx7IQepmOtpiBJ-L67Zjx_ZizrIA2A'
const instance = axios.create({
    baseURL: 'http://mot-file.xyz:8080/', headers: {
        Authorization: `Bearer ${token}`
    }
});
// curlirize(instance);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const startCrawlStory = async (url, storyType, story) => {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data);
    const description = $('body > div.book-detail-wrap.center990 > div.book-content-wrap.cf > div.left-wrap.fl > div.book-info-detail > div.book-intro > p').text();
    const image = $('#bookImg > img').attr('src');
    const author = $('#authorId > p > a').text();
    const storyName = $('body > div.book-detail-wrap.center990 > div.book-information.cf > div.book-info > h1').text();
    const categoryName = $('body > div.book-detail-wrap.center990 > div.book-information.cf > div.book-info > p.tag > a.red').text()
    const story_id = $('meta[name="book_detail"]').attr('content')
    let status = $('body > div.book-detail-wrap.center990 > div.book-information.cf > div.book-info > p.tag > span').text()
    status = status === 'Đã hoàn thành' ? 'complete' : 'ongoing'
    const listTag = $('body > div.book-detail-wrap.center990 > div.book-content-wrap.cf > div.left-wrap.fl > div.book-info-detail > div.book-state > ul > li.tags > div > p > a').toArray()
    const tags = []
    for (const tag of listTag) {
        const name = $(tag).text()
        tags.push(name)
    }

    const dataCreate = {
        storyName,
        description: description,
        coverImg: image,
        author: author,
        storyType,
        categoryName,
        tags,
        status,
        story_id
    }
    // console.log('dataCreate', dataCreate);

    await insertStory(dataCreate, story)
    // await uploadImage(image)
}
// startCrawlStory('https://truyen.tangthuvien.vn/doc-truyen/thanh-lien-chi-dinh', '78dc5cd3-d1f8-4c92-94e4-7f4083ac4b9b').then()


const insertStory = async (dataCreate, st) => {
    //get buffer from url image to upload from data
    const coverImg = await axios.get(dataCreate.coverImg, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(coverImg.data);
    const imageName = `${uuid()}.jpg`;
    // const imageDir = path.resolve(__dirname, 'image');
    // if (!fs.existsSync(imageDir)) {
    //     fs.mkdirSync(imageDir, { recursive: true }); // Tạo thư mục nếu chưa có
    // }
    const imagePath = `./${imageName}`;
    fs.writeFileSync(imagePath, imageBuffer);
    const formData = new FormData();
    formData.append('storyName', dataCreate.storyName.trim());
    formData.append('storyType', dataCreate.storyType);
    formData.append('description', dataCreate.description);
    formData.append('author', dataCreate.author);
    formData.append('coverImg', fs.createReadStream(imagePath));
    try {

        const { data: story } = await instance.post('/story/add', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...formData.getHeaders(),
            }
        })

        if (story && story.data && story.data.id) {
            const dataTag = {
                storyId: story.data.id,
                category: dataCreate.categoryName,
                status: dataCreate.status,
                storyType: "china",
                tagList: dataCreate.tags
            }

            await instance.post('http://mot-file.xyz:8080/story/add-tags', dataTag, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            st.id = story.data.id
            st.story_id = dataCreate.story_id
            st.processed = true
        }


    } catch (e) {
        if (error.response) {
            console.log('error.response.data', error.response.data);
            console.log('error.response.status', error.response.status);
        }
    }
    fs.unlinkSync(imagePath);
}
//new
let oldList = fs.readFileSync(oldFilePath, 'utf8');
oldList = JSON.parse(oldList);

const listCategory = [
    {
        id: '78dc5cd3-d1f8-4c92-94e4-7f4083ac4b9b',
        webId: 1
    },
    {
        id: '6ac4de5f-f6b2-4131-a570-9f1c477b2c0b',
        webId: 2
    },
    {
        id: '8894e712-6782-4a57-b0a9-29a24b49a369',
        webId: 3
    },
    {
        id: '1f32b085-2a9d-4f55-9ba4-551d6ab5602c',
        webId: 4
    },
    {
        id: '96c37ce0-3afb-40ef-b7e3-6ec9dfc29bb9',
        webId: 5
    },
    {
        id: '5ed939cb-8613-4c63-b43b-d16d80247c8e',
        webId: 6
    },
    {
        id: 'c9d74d12-8aa6-455d-8177-73d3de9c2231',
        webId: 7
    },
    {
        id: 'f89877aa-2bef-43ba-9755-ffb864849e78',
        webId: 8
    },
    {
        id: '888cb28b-4ae6-496b-a7cd-606b0cad7397',
        webId: 9
    },
    {
        id: '77f43355-672a-4abd-a8dc-ce07abf97cc5',
        webId: 10
    },
    {
        id: '00f69428-8dea-4a35-a898-1996722a0a46',
        webId: 11
    },
    {
        id: '61ac4f9a-c31f-44d9-9522-1a30248da4ef',
        webId: 12
    }
]
const results = []

const crawlListStory = async (page, storyType, webId) => {
    const pageUrl = `https://truyen.tangthuvien.vn/tong-hop?rank=vw&ctg=${webId}&page=${page}`
    console.log('pageUrl', pageUrl);
    await delay(1500)
    const { data } = await axios.get(pageUrl)
    const $ = cheerio.load(data);
    const list = $('#rank-view-list ul li').toArray();
    for (const item of list) {
        try {
            let name = $(item).find('h4 a').text();
            name = name.trim();
            const url = $(item).find('h4 a').attr('href');
            //check if storyName of item in oldList include name
            const story = oldList.find(story => story.storyName.includes(name));
            if (story) {
                continue
            }

            results.push({
                storyName: name,
                storyType,
                story_id: '',
                processed: false,
                url
            })
        } catch (error) {

        }

    }

}
const run = async () => {
    for (const category of listCategory) {
        await delay(1200)
        try {
            for (let index = 0; index < 15; index++) {
                const page = index + 1
                console.log(`start crawl page ${page} of category ${category.webId}`);
                await delay(500)
                try {
                    await crawlListStory(page, category.id, category.webId);
                } catch (error) {
                    // console.log('error', error);

                }

            }
        } catch (error) {

        }

    }
}
// run().then(() => {
//     writeStory(results);
// })

const uploadImage = async (url) => {
    const { data } = await axios.get(url, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(data);
    const imageName = `${uuid()}.jpg`;
    const imagePath = `./${imageName}`;
    fs.writeFileSync(imagePath, imageBuffer);
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    try {
        const image = await axios.post('https://server.kormsg.com/api/v1/image/upload/1920', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        console.log('image', image.data);

    } catch (error) {
        console.log('error', error);
    }
    fs.unlinkSync(imagePath);
}

// uploadImage('https://www.nae.vn/ttv/ttv/public/images/story/2209.jpg').then()

const readStory = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}
function writeStory(stories) {
    fs.writeFileSync(filePath, JSON.stringify(stories, null, 2), 'utf8');
}

const runCrawl = async () => {
    const stories = readStory();
    for (const [index, story] of stories.entries()) {
        if (!story.processed && !story.id) {
            console.log('start crawl story', story.storyName, index + 1);
            await delay(3000);
            const url = story.url;
            const storyType = story.storyType;
            await startCrawlStory(url, storyType, story);
            await writeStory(stories);
        }
    }
}
runCrawl().then()