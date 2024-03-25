const fs = require('fs');
const path = require('path');

const imageDir =  path.join(process.cwd(), '/public/images')
console.log(imageDir)
const files = fs.readdir(imageDir, (err, file) => {
  console.log('run')
});
const ready = files.map((file) => {
  // import file from imageDir
  // console.log(`import ${file} from '/public/images/${file}`)
  return `import ${file} from ${imageDir}/${file}`
});

fs.writeFile(path.join(__dirname, './imagesReady.js'), ready)

// console.log(files)