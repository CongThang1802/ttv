const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'tags.json');

// Hàm đọc dữ liệu từ file JSON
function readTags() {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Hàm ghi dữ liệu vào file JSON
function writeTags(tags) {
  fs.writeFileSync(filePath, JSON.stringify(tags, null, 2), 'utf8');
}

// Hàm xử lý từng tag
function processTags() {
  let tags = readTags();

  for (let tag of tags) {
    if (!tag.processed) {
      console.log(`Processing tag: ${tag.name}`);
      
      // Thực hiện xử lý (giả sử mất 1s để xử lý)
      setTimeout(() => {
        tag.processed = true;
        console.log(`Tag ${tag.name} processed`);

        // Ghi trạng thái đã xử lý vào file
        writeTags(tags);
      }, 1000);
    }
  }
}

processTags();
