const yargs = require("yargs");
const {
	addNote,
	removeNote,
	printNotes,
	editNote,
} = require("./notes.controller");

yargs.command({
	command: "add",
	describe: "Add new note to list",
	builder: {
		title: {
			type: "string",
			describe: "Note title",
			demandOption: true,
		},
	},
	handler({ title }) {
		addNote(title);
	},
});

yargs.command({
	command: "list",
	describe: "Print all notes",
	handler() {
		printNotes();
	},
});

yargs.command({
	command: "edit",
	describe: "Edit note by ID",
	builder: {
		id: {
			type: "string",
			describe: "Note ID",
			demandOption: true,
		},
		newTitle: {
			type: "string",
			describe: "Note new title",
			demandOption: true,
		},
	},
	handler({ id, newTitle }) {
		editNote(id, newTitle);
	},
});

yargs.command({
	command: "remove",
	describe: "Remove note by ID",
	builder: {
		id: {
			type: "string",
			describe: "Note ID",
			demandOption: true,
		},
	},
	handler({ id }) {
		removeNote(id);
	},
});

yargs.parse();
