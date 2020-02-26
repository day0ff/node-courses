const yargs = require('yargs');

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
        console.log(`Adding a new note:\nTitle:\t${title}.\nBody:\t${body}`);
    }
});

yargs.command(
    'remove',
    'Remove a note.',
    builder,
    function ({title, body}) {
        console.log(`Removing the note:\nTitle:\t${title}.\nBody:\t${body}`);
    }
);

yargs.command(
    'read',
    'Read a note.',
    () => {
        console.log(`Reading a note.`);
    }
);

yargs.command(
    'list',
    'List all notes.',
    () => {
        console.log(`Listing out all notes.`);
    }
);

// To show all arguments.
// console.log(process.argv);

// To show all parsed arguments.
// console.log(yargs.argv);

yargs.parse();
