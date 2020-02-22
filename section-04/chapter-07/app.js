const yargs = require('yargs');
const {addNote, removeNote, readNote, listNotes} = require('./notes.js');

const builder = {
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
    },
    body: {
        describe: 'Note body',
        demandOption: true,
        type: 'string'
    }
};

yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    builder,
    handler({title, body}) {
        console.log(`Adding a new note:\t${title}:"${body}"`);
        addNote({title, body});
    }
});

yargs.command(
    'remove',
    'Remove a note.',
    {title: builder.title},
    function ({title}) {
        console.log(`Removing the note:\t${title}`);
        removeNote({title});
    }
);

yargs.command(
    'read',
    'Read a note.',
    {title: builder.title},
    function ({title}) {
        console.log(`Reading a note.`);
        readNote({title});
    }
);

yargs.command(
    'list',
    'List all notes.',
    () => {
        console.log(`Listing out all notes.`);
        listNotes();
    }
);

yargs.parse();
