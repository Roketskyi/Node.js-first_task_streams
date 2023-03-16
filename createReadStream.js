const fs = require('fs')
const readStream = fs.createReadStream('test.txt', { highWaterMark: 13 })

let wordCounter = 0;
let isLetter = false;

readStream.on('data', (chunk) => {
  const chunkToString = chunk.toString();

  console.log(chunkToString)

  for (let i = 0; i < chunkToString.length; i++) {
    if ((chunkToString[i] >= 'a' && chunkToString[i] <= 'z') || (chunkToString[i] >= 'A' && chunkToString[i] <= 'Z')) {
      isLetter = true;
    } else {
      if(isLetter === true) {
        wordCounter++;
      }

      isLetter = false;
    }
  }

  console.log('-------------')
})

readStream.on('end', () => {
  if(isLetter === true) {
    wordCounter++;
  }

  console.log('Good job', wordCounter)
})
