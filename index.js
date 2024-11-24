const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs")
const { v4: uuid } = require("uuid");
const pg = require('pg')
const { Pool } = pg
const pool = new Pool(
    {
        host: '171.244.61.87',
        user: 'mot',
        password: 'Abcd@1234',
        database: 'mot_database',
        port: 5432,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    }
)

const source = [
    {
        id: '1c65003b-5236-4553-80f3-5aa47de33784',
        story_id: '134',
    },
    {
        id: '113ff553-8297-4427-b632-5cffff4a9e01',
        story_id: '3361',
    },
    {
        id: '661921c5-7493-450d-a3ed-d684be61a8e6',
        story_id: '73',
    },
    {
        id: '0cb9f074-a6a1-4f3c-8ab4-aa2a1612d41c',
        story_id: '2923',
    },
    {
        id: "0b20bb58-ddde-4091-a4a0-f0ff527081ca",
        story_id: '332',
    },
    {
        id: "0f1c1a4c-7d74-4a39-86b2-46f811cd8ed7",
        story_id: '2581',
    },
    {
        id: '9005020e-9f15-4659-9dd1-fe8cc199e0db',
        story_id: '6346',
    },
    {
        id: '8a82a840-6516-4a97-a23c-75db574ab2a5',
        story_id: '35224',
    },
    {
        id: 'f2c47c36-b3e4-4c18-b5b9-e94f85ff61f9',
        story_id: '37384',
    },
    {
        id: '1eb2e13e-af21-4d0b-a304-d4fb7f6fe590',
        story_id: '37990',
    },
    {
        id: '005407df-d357-4b00-9593-ad792cdcd369',
        story_id: '37860',
    },
    {
        id: 'dcc50a7c-51c7-41e4-bfa6-c9fd9bff3bc5',
        story_id: '2176',
    },
    {
        id: '8197ca5f-ac2c-4164-8e79-bfdddc6c23c8',
        story_id: '2177'
    },
    {
        id: '6335d482-9729-41f6-b71c-2696bfa157d9',
        story_id: '2232'
    },
    {
        id: '75846097-5054-469f-a51e-8fbd97c1da05',
        story_id: '2511'
    },
    {
        id: '5062e5e2-eb6b-4e2a-87d2-f876b82d5fdc',
        story_id: '2209'
    },
    {
        id: 'f1f8c347-2c3b-404c-853e-259f28f0ff9c',
        story_id: '6091'
    },
    {
        id: 'd4732e2b-7904-4797-b902-eac82c436baa',
        story_id: '5900'
    },
    {
        id: '435f512e-6370-4aec-8e62-a783702b7d8b',
        story_id: '18'
    },
    {
        id: 'f19b0117-ef88-40fe-b681-fca956b7384d',
        story_id: '6033'
    },
    {
        id: '423d486d-0d89-44d2-8897-c6ecf1fa4d43',
        story_id: '2780'
    },
    {
        id: '7976e6fd-05c5-460b-bd42-556292947e3e',
        story_id: '23869'
    },
    {
        id: '1552dd5a-eccf-4aa2-9927-ea3a06f9ba74',
        story_id: '110'
    },
    {
        id: 'd9fcbcb0-0052-4780-88b6-ff2771dd7125',
        story_id: '19954'
    },
    {
        id: '8402c018-165c-45fb-84e4-135cd17be78b',
        story_id: '34'
    },
    {
        id: 'cdc101bc-073c-43c1-bfaf-c22edf7bfe71',
        story_id: '2260'
    },
    {
        id: '9b600df0-e47f-4904-8b04-39dc86acacfe',
        story_id: '2806'
    },
    {
        id: '98f15816-1510-42d1-90e6-298a5662248e',
        story_id: '241'
    },
    {
        id: 'c06e03bf-2bf3-4adb-bfe3-81954ca0f98d',
        story_id: '2257'
    },
    {
        id: '8bdd6a1e-4894-4dcd-b615-8c12ddd6adfd',
        story_id: '17299'
    },
    {
        id: 'bdd93533-cde9-4a5f-8760-690b82864d10',
        story_id: '35'
    },
    {
        id: '6ade7f07-41f9-4ad9-848a-556b988e1af0',
        story_id: '37967'
    },
    {
        id: 'f5c99e49-332a-4401-acda-cf71c3d59e7c',
        story_id: '2486'
    },
    {
        id: 'a30f9a5b-d55c-4777-9531-913826d9e29e',
        story_id: '31'
    },
    {
        id: '376f4253-fad4-458a-98fa-e31fac91c220',
        story_id: '2267'
    },
    {
        id: '27ea72f2-3e52-405c-ac09-83e3b6b0bea6',
        story_id: '33865'
    },
    {
        id: 'ef63be7a-99d4-4c46-83ea-26c14b60663b',
        story_id: '20472'
    },
    {
        id: 'd61bd1df-0f49-4b9c-ab49-14df12c5b7ff',
        story_id: '5143'
    },
    {
        id: '5d45a521-5438-4335-9e6e-ad30e41af108',
        story_id: '32376'
    },
    {
        id: 'cbd4fbf6-a276-4611-b129-222588f6e5f1',
        story_id: '2603'
    },
    {
        id: 'aedc83f8-25c7-44bc-80ac-f1f00cb5b64e',
        story_id: '2455'
    },
    {
        id: 'e45c68f2-578e-4dd0-bf5a-b520847dfe28',
        story_id: '500'
    },
    {
        id: '9c92e755-93bb-4273-a643-6b44400f052f',
        story_id: '2777'
    },
    {
        id: 'd99a3074-a819-4a0b-836e-ae162fff32c6',
        story_id: '2430'
    },
    {
        id: '33dbe052-da15-4e9b-b05a-d94cb9e90eb3',
        story_id: '33516'
    },
    {
        id: 'a133df2f-714c-4b4f-aca7-ad43b7b4d5f9',
        story_id: '33867'
    },
    {
        id: '47e33e5e-22db-4539-b3a1-300810a1daba',
        story_id: '29467'
    },
    {
        id: 'aa7fd816-1a1d-4387-880b-4911fe4de617',
        story_id: '196'
    },
    {
        id: 'fbd2454e-0403-4f61-82cf-bdc29998fb52',
        story_id: '2881'
    },
    {
        id: '01bfb77f-041c-4856-a6e9-509391ea7863',
        story_id: '20094'
    },
    {
        id: 'befcdd5e-a2a2-4cf6-b0c7-3a7ca3e8da32',
        story_id: '32017'
    },
    {
        id: 'a6542130-8c0b-470b-a20a-04246bcc4a06',
        story_id: '426'
    },
    {
        id: '85fc63b0-0f90-4425-9ad8-726b57fd96ad',
        story_id: '27350'
    },
    {
        id: 'b2f4ad9c-0b24-4b46-82aa-d81169fe2c5e',
        story_id: '22327'
    },
    {
        id: 'f8c5d2eb-dfb0-4afa-ab9a-021497f73a44',
        story_id: '11182'
    },
    {
        id: '8fe5940a-6392-4b2a-87b8-4d33fed5d1c6',
        story_id: '18794'
    },
    {
        id: 'eb19ab6b-b92c-43d5-a36d-8dea3cab692c',
        story_id: '59'
    },
    {
        id: 'a9eaf729-0b65-4068-b9b2-be57326cf301',
        story_id: '11175'
    },
    {
        id: 'a4652fb0-a656-4afa-a9b5-d7f0015f147c',
        story_id: '11165'
    },
    {
        id: '1f451ba6-77b2-401c-9a83-f29d11942798',
        story_id: '18437'
    },
    {
        id: '487ee802-6c9a-4c95-8f59-3c94e5c75c2a',
        story_id: '225'
    },
    {
        id: '1fdbccf8-781d-47a1-ac8e-b0aa89de8fa8',
        story_id: '32359'
    },
    {
        id: 'c7134965-9608-46e3-aa3a-aa024ccb3211',
        story_id: '30386'
    },
    {
        id: '84d26f88-dec7-47a9-b1f2-fc669845c26c',
        story_id: '51'
    },
    {
        id: '01e232d8-9839-437e-a69e-33a91eb3ea9c',
        story_id: '543'
    },
    {
        id: '48b1f15a-1f61-4209-9f9b-e55983b12a8f',
        story_id: '5815'
    },
    {
        id: '9393b548-4242-4e2b-b99a-8f16af3aa154',
        story_id: '32956'
    },
    {
        id: '8fb59936-5168-4a32-8ae7-fbefb44057ff',
        story_id: '17832'
    },
    {
        id: '380a5648-9b1b-420e-8a78-1240db226818',
        story_id: '34427'
    },
    {
        id: '7273e9a8-4d28-42ef-982c-57db12fe1bb0',
        story_id: '265'
    },
    {
        id: '402684d3-ccd5-4641-b7c2-81893174be19',
        story_id: '11876'
    },
    {
        id: '7e9925ca-4efa-4664-b5e6-b6146764f3ea',
        story_id: '12333'
    },
    {
        id: 'b524e220-882f-4ec7-9c6a-bd6d29eee520',
        story_id: '352'
    },
    {
        id: 'db4aeba4-fffd-4315-839e-8eee84949054',
        story_id: '5763'
    },
    {
        id: 'f7334800-4df1-4654-a5ff-8ffbc06ce07c',
        story_id: '6856'
    },
    {
        id: 'eba6fbc0-cb0e-428b-9c7d-090eb7d45526',
        story_id: '16'
    },
    {
        id: '5032510a-1d56-4b51-9e77-37c80505571d',
        story_id: '6848'
    },
    {
        id: '667c449a-3bf8-46bf-be97-80ffcd913eb1',
        story_id: '19523'
    },
    {
        id: '5862579a-1d05-4391-a793-31590d821b18',
        story_id: '6869'
    },
    {
        id: 'e00001d8-917d-4272-bc32-9f09fee99aa6',
        story_id: '15043'
    },
    {
        id: 'b2f0cf59-e6be-4045-a979-dc18e7fef3a5',
        story_id: '33453'
    },
    {
        id: '3fac976d-dbd2-4475-8c45-2b5d64ded951',
        story_id: '31508'
    },
    {
        id: 'a6ecf168-2241-4435-8f2a-199e2c13a499',
        story_id: '41'
    },
    {
        id: '8b7ac651-d0f8-4558-a1d2-43fb12f0bfb3',
        story_id: '23815'
    },
    {
        id: '9f2336db-9cd8-40f2-a48c-f1a9b89a49ea',
        story_id: '26952'
    },
    {
        id: '71301ec8-bc97-4710-ad0d-d8ca98a2a7c6',
        story_id: '30555'
    },
    {
        id: 'bfb893ae-3ac4-4e0d-9dd3-b5b403f38a7b',
        story_id: '2962'
    },
    {
        id: 'e3871b90-d667-4a47-9f35-cddf687f3152',
        story_id: '28999'
    },
    {
        id: 'a715a476-3857-4b7e-b365-f120f974a392',
        story_id: '36180'
    },
    {
        id: '29c3d8e6-dcef-4e15-b4b7-7bdcaeeaa9ee',
        story_id: '29237'
    },
    {
        id: 'ac66c79a-e129-4417-863b-ee27c32aa79a',
        story_id: '33701'
    },
    {
        id: 'c998f0da-9a14-4081-80ac-a44006830a90',
        story_id: '28471'
    },
    {
        id: 'afe29320-2bdf-4270-8ecf-918b50180f92',
        story_id: '6849'
    },
    {
        id: '19d6e734-2950-46d0-8b86-409dc9b250cf',
        story_id: '22462'
    },
    {
        id: 'ecba1869-c48e-4e7b-8001-7ede478923c7',
        story_id: '12023'
    },
    {
        id: 'ea314cba-75f2-417b-87f6-f7c2d9215b06',
        story_id: '28124'
    },
    {
        id: '2e4334a6-117b-49b9-a9dc-03886b2eb66c',
        story_id: '6865'
    },
    {
        id: '35e05489-2e62-47b4-b9dd-be7dabb9721d',
        story_id: '1097'
    },
    {
        id: '55aff501-c107-4ea3-a381-81f835be1cb5',
        story_id: '6373'
    },
    {
        id: 'eefd44c7-5f15-496a-a513-3f390ece85e6',
        story_id: '6966'
    },
    {
        id: 'f5a0d48c-1ffb-479d-9568-61a082a71bca',
        story_id: '6954'
    },
    {
        id: '6111d37f-edf2-48f0-bc48-3daa552c9013',
        story_id: '465'
    },
    {
        id: '2b68cb1d-b576-4b95-bf1e-bb1b388b9f63',
        story_id: '25954'
    },
    {
        id: '6359ffc1-0127-45a6-af64-edf5254f8f08',
        story_id: '2631'
    },
    {
        id: '43d63258-e308-4a8a-afff-5d432ea45fee',
        story_id: '123'
    },
    {
        id: '56fa2c34-5e50-40f1-92a7-7455bbcfc8a7',
        story_id: '18479'
    },
    {
        id: '82665afe-d1b6-4253-8bc2-fd0e87e8d69c',
        story_id: '2571'
    },
    {
        id: 'bac768dc-e038-4cf7-9352-afbb7f271d6d',
        story_id: '26280'
    },
    {
        id: 'a19495f7-c92e-4f0b-81c8-709e171938d3',
        story_id: '6991'
    },
    {
        id: '1a1be47d-5038-4fd1-965a-73dd4c49b6b7',
        story_id: '141'
    },
    {
        id: '25dbc53e-49dc-49a7-8d1e-9ffd7e2eb828',
        story_id: '2274'
    },
    {
        id: 'e3e41ea9-a48d-4a71-8073-7f22fab7f94d',
        story_id: '49'
    },
    {
        id: 'd93e693d-aec4-4149-8b14-0d27e6309298',
        story_id: '435'
    },
    {
        id: '1f91eec4-3d58-49ad-a19f-773413543b51',
        story_id: '14620'
    },
    {
        id: '4625010f-3b1e-4d4e-8ab1-0003561502cc',
        story_id: '23279'
    },
    {
        id: '950575c8-1b5d-4742-a0ff-d11702a2fb30',
        story_id: '2262'
    },
    {
        id: 'ec79417a-7267-4218-8129-fd9a509ee154',
        story_id: '2520'
    },
    {
        id: '7d27c55e-b565-4a9d-b557-b60adcbf7f09',
        story_id: '3395'
    },
    {
        id: 'b6d5de41-6f53-4ea2-9dac-04215778d936',
        story_id: '18490'
    },
    {
        id: '8d2deb3c-53eb-4183-854a-41fbafdd412d',
        story_id: '24720'
    },
    {
        id: '6db50808-5b25-467d-ab63-6d42c81eed39',
        story_id: '2926'
    },
    {
        id: 'e18f329f-7f65-4565-a9f7-62325b780817',
        story_id: '33230'
    },
    {
        id: '7fa94811-c683-4ea3-a071-3787a1c4d366',
        story_id: '2601'
    },
    {
        id: '6cf58f9c-edd1-4437-98a7-9a4e31ec4a9b',
        story_id: '21918'
    },
    {
        id: '4a44a148-aade-4419-ba10-524689e31a56',
        story_id: '28080'
    },
    {
        id: 'b02695a7-9265-4a52-8415-756850a5ba1a',
        story_id: '5222'
    },
    {
        id: 'd674bd0a-6df4-44c1-9740-d57712ec4dd1',
        story_id: '548'
    },
    {
        id: '1cc61844-2a9d-4c97-ac97-cc75bc3a61ec',
        story_id: '32661'
    },
    {
        id: 'f9492889-52e9-44a7-a1ee-344bfcf1309d',
        story_id: '19309'
    },
    {
        id: '9274bda2-3fc5-42ac-a1e9-c5e251a50a45',
        story_id: '32085'
    },
    {
        id : '506a06dc-ff30-49cd-9d8c-13313384288a',
        story_id : '21345'
    },
    {
        id:'b083faa3-ae43-424b-9b5f-dcce68c48d91',
        story_id:'33188'
    },
    {
        id : '49986487-30ae-4a90-bf20-f278e6c169b4',
        story_id : '38174'
    },
    {
        id : 'a6556702-186c-49bc-be30-cdbd278ec07b',
        story_id : '29945'
    },
    {
        id : '0d42d16a-74ef-435a-8e35-1236a45d2325',
        story_id : '19669'
    },
    {
        id : '7d9ac3fa-7764-45e8-b161-a671e5d89ad2',
        story_id : '25925'
    },
    {
        id : 'faa5f3e9-1d67-49fd-bbd1-4378becf794f',
        story_id : '19721'
    },
    {
        id : 'caccba96-7f1f-4477-9cc2-b0bf864b33e2',
        story_id : '31996'
    },
    {
        id : '2fe14db8-7a87-4e36-b0a2-382751cde265',
        story_id : '31249'
    },
    {
        id: '8e1bd51e-def5-45e4-b5a3-4b655150bb0c',
        story_id: '257',
    },
]




const url = 'https://ngontinh.tangthuvien.vn/doc-truyen/chieu-ro-ngoi-sao-nang'
const story_type_id = '4dc3d975-ea96-4c77-9082-15f88a7063d0'
const created_by = 'c4c14f2b-0682-4348-a582-58c09557f095'
const status = 'PUB'


const startCrawlStory = async (url) => {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data);
    const description = $('body > div.book-detail-wrap.center990 > div.book-content-wrap.cf > div.left-wrap.fl > div.book-info-detail > div.book-intro > p').text();
    const image = $('#bookImg > img').attr('src');
    const author = $('#authorId > p > a').text();
    const story_name = $('body > div.book-detail-wrap.center990 > div.book-information.cf > div.book-info > h1').text();
    const dataCreate = {
        story_name,
        description: description,
        cover_img: image,
        author: author,
        story_type_id: story_type_id,
        created_by: created_by,
        created_at: new Date(),
        last_update: new Date(),
        status
    }
    await insertStory(dataCreate)
}
// startCrawlStory(url).then()

const insertStory = async (dataCreate) => {
    const client = await pool.connect()
    try {
        const res = await client.query('INSERT INTO story(id,story_name,description,cover_img,author,story_type_id,created_by,created_at,last_update,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [uuid(), dataCreate.story_name, dataCreate.description, dataCreate.cover_img, dataCreate.author, dataCreate.story_type_id, dataCreate.created_by, dataCreate.created_at, dataCreate.last_update, dataCreate.status])
        console.log('res', res);
    } catch (e) {
        console.log('e', e);
    } finally {
        client.release()
        pool.end()
    }
}
// insertStory().then()

// const urlChapter = 'https://truyen.tangthuvien.vn/doc-truyen/dinh-cap-luu-manh/chuong-'
// const story_id = 'bce63d64-038e-4588-a8d4-8547e4ce3dfc'

const startCrawlChapter = async (url) => {
    // const client = await pool.connect()

    for (let index = 524; index < 525; index++) {
        console.log(`start crawl chapter ${index + 1}`);

        const { data } = await axios.get(`${url}${index + 1}`)
        const $ = cheerio.load(data);
        const chapter_name = $('body > div.container.body-container > div.content > div > h2').text();
        let content = $('body > div.container.body-container > div.content div.chapter-c > div.chapter-c-content > div.box-chap:nth-child(3)').text();
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
    }
    // client.release()
    // pool.end()
}
// startCrawlChapter(urlChapter).then()

const insertChapter = async (dataCreate, client) => {
    try {
        const res = await client.query('INSERT INTO "CHAPTER"(id,story_id,chapter_name,content,chapter_num,chapter_order,upload_by,approved_by) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [uuid(), dataCreate.story_id, dataCreate.chapter_name, dataCreate.content, dataCreate.chapter_num, dataCreate.chapter_order, dataCreate.upload_by, dataCreate.approved_by])
        console.log('res');
    } catch (e) {
        console.log('e', e);
    }
}

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiQURNSU4iLCJuYW1lIjoiaWthcnVzIiwiaWQiOiJjNGMxNGYyYi0wNjgyLTQzNDgtYTU4Mi01OGMwOTU1N2YwOTUiLCJleHAiOjE3MjQyNDIwOTcsImlhdCI6MTcyMzYzNzI5N30.4WhHwy2gd0jiXXh11y6B-g2vzrGOATDkMFghwmey0Xvs8Gwx3p69UJvJwZDN73fnMjHgjYuiLrqTuC0hxQ3Aew'

const insertChapter2 = async (dataCreate) => {
    await delay(1000)
    try {
        await axios.post('http://owlreads.xyz:8080/chapter/add', dataCreate, {
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
    }
}
// startCrawlChapter2('https://truyen.tangthuvien.vn/story/chapters?story_id=5180').then()

const main = async () => {
    for (const src of source) {
        await startCrawlChapter2(`https://truyen.tangthuvien.vn/story/chapters?story_id=${src.story_id}`, src.id)
    }
}

main().then()
