const fsPromises = require('fs').promises;

const PATH_TO_FILE = './temp/notes.txt';
const DIR_NAME = 'temp';

module.exports = {
    addNote,
    removeNote,
    readNote,
    listNotes
};

async function addNote({title, body}) {
    const data = await readFile();
    const isNewNote = !data.find(value => value.title === title);
    if (isNewNote) {
        await writeFile([...data, {title, body}]);
        console.log(`Added new note:\t${title}`);
    } else {
        const newData = data.reduce((acc, value) => value.title === title ? [...acc,{title, body}] : [...acc,value], []);
        await writeFile(newData);
        console.log(`Changed note:\t${title}`);
    }
}

async function removeNote({title}) {
    const data = await readFile();
    const filteredData = data.filter(value => value.title !== title);
    if(filteredData.length !==  data.length) {
        await writeFile(filteredData);
        console.log(`Removed note:\t${title}`);
    }else{
        console.log(`Record with the title "${title}" not found.`);
    }
}

async function readNote({title}) {
    const data = await readFile();
    const note = data.find(value => value.title === title);
    if(note) {
        console.log(`Read note:\t${note.title}:"${note.body}"`);
    }else{
        console.log(`Record with the title "${title}" not found.`);
    }
}

async function listNotes() {
    const data = await readFile();
    if(data.length) {
        const formatData = data.reduce((acc, {title, body}) => [...acc, `${title}\t"${body}"`], []).join('\n');
        console.log(formatData);
    }else{
        console.log(`There are no notes yet.`);
    }
}

function readFile() {
    return fsPromises.readFile(PATH_TO_FILE)
        .then(data => data.toString())
        .then(text => JSON.parse(text))
        .catch(() => []);
}

function writeFile(data) {
    return fsPromises.writeFile(PATH_TO_FILE, JSON.stringify(data, null, '\t'))
        .catch(() => fsPromises.mkdir(DIR_NAME).then(() => writeFile(data)));
}
