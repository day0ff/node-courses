const fsPromises = require('fs').promises;

writeFileAsync().then(() => console.log('Write File Async complete.')).catch(console.error);
writeFileAwait().then(() => console.log('Write File Await complete.')).catch(console.error);

function writeFileAsync() {
    return fsPromises.writeFile('../../temp/note-async.txt', 'Hello World! Async')
        .then(() => fsPromises.appendFile('../../temp/note-async.txt', '\nFrom 2020! Async'));
}

async function writeFileAwait() {
    await fsPromises.writeFile('../../temp/note-await.txt', 'Hello World! Await!');
    await fsPromises.appendFile('../../temp/note-await.txt', '\nFrom 2020! Await!');
}
