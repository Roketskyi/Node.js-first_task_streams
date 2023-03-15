const fs = require('fs');

let lastWordIncomplete = '';
let wordCount = 0;

const readStream = fs.createReadStream('file.txt');

readStream.on('data', (chunk) => {
  const text = chunk.toString();
  const words = text.split(/\s+/);
  
  words[0] = lastWordIncomplete + words[0];
  lastWordIncomplete = words.pop();

  wordCount += words.length;
});

readStream.on('end', () => {
  if (lastWordIncomplete) {
    wordCount++;
  }

  console.log(`Кількість слів у файлі: ${wordCount}`);
});

readStream.on('error', (err) => {
  console.log(err);
});
