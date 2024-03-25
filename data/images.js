const fs = require('fs');
const path = require('path');

let yachtImages = {};

const imageDir = path.join(__dirname, '..', 'public', 'images');
const files = fs.readdirSync(imageDir);
const outputFile = path.join(__dirname, '..', 'imageImports.js');
const imports = files.map(file => {
    const newName = path.basename(file, path.extname(file)).replace('-', '');
    yachtImages[newName] = true; // Assigning true to indicate existence of the key
    return `import ${newName} from '/public/images/${file}';`;
});

// Write the import statements and yachtImages object to the output file
fs.writeFileSync(outputFile, `${imports.join('\n')}\n\nconst yachtImages = ${formatYachtImages(yachtImages)};\n\nexport default yachtImages;`);

// Function to format the yachtImages object as desired
function formatYachtImages(yachtImages) {
    return `{ ${Object.keys(yachtImages).join(', ')} }`;
}