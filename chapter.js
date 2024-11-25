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
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiQURNSU4iLCJuYW1lIjoiaWthcnVzIiwiaWQiOiJjNGMxNGYyYi0wNjgyLTQzNDgtYTU4Mi01OGMwOTU1N2YwOTUiLCJleHAiOjE3MzI2Nzk4NDgsImlhdCI6MTczMjA3NTA0OH0.LctA2LUH5iKxuRlvI_aEBBaOtwJruoETnrTQajB6-9bUTM_dgYaRh6sABx7IQepmOtpiBJ-L67Zjx_ZizrIA2A'



const readStory = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}
function writeStory(stories) {
  fs.writeFileSync(filePath, JSON.stringify(stories, null, 2), 'utf8');
}

const insertChapter2 = async (dataCreate) => {
  await delay(2000)
  try {
    await axios.post('http://mot-file.xyz:8080/chapter/add', dataCreate, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.log('error', error);
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const startCrawlChapter2 = async (url, story_id) => {
  const { data } = await axios.get(url)
  const $ = cheerio.load(data);
  const arr = $('body > ul > li.col-xs-6 > a').toArray();

  for (const [index, item] of arr.entries()) {
    await delay(2000)
    try {
      console.log(`start crawl chapter ${index + 1}`);
      const urlDetail = $(item).attr('href')
      const { data: dataDetail } = await axios.get(urlDetail)
      const $1 = cheerio.load(dataDetail);
      const chapter_name = $1('body > div.container.body-container > div.content > div > h2').text();
      let content = $1('body > div.container.body-container > div.content div.chapter-c > div.chapter-c-content > div.box-chap:nth-child(3)').text();
      content = content.replace('Tàng Thư Viện', 'OwlReads')
      content = Buffer.from(content).toString('base64')
      const chapter_order = index + 1
      const dataCreate = {
        storyId: story_id,
        chapterName: chapter_name,
        content,
        chapterOrder: chapter_order,
      }
      await insertChapter2(dataCreate)
      console.log(`end crawl chapter ${index + 1}`);
    } catch (error) {
    }
  }
}


const run = async () => {
  const stories = readStory();
  for (const story of stories) {
    if (!story.processed && story.id && story.story_id) {
      await delay(1000);
      console.log('start crawl story', story.storyName);
      await startCrawlChapter2(`https://truyen.tangthuvien.vn/story/chapters?story_id=${story.story_id}`, story.id)
      story.processed = true
      await writeStory(stories);
      console.log('end crawl story', story.storyName);
    }

  }
  console.log('end crawl');
  
}

run().then()