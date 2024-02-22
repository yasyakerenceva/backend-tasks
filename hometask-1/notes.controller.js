const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
	const notes = await getNotes();

	const note = {
		title,
		id: Date.now().toString(),
	};

	notes.push(note);

	await fs.writeFile(notesPath, JSON.stringify(notes));
	console.log(chalk.blue.inverse("Note was added!"));
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
	const notesParse = JSON.parse(notes);

	return Array.isArray(notesParse) ? notesParse : [];
}

async function editNote(id, newTitle) {
	const notes = await getNotes();
	const checkId = notes.findIndex((note) => note.id === id);

	if (checkId !== -1 && newTitle) {
		const updatedNotes = notes.map((note) => {
			if (note.id === id) {
				return { ...note, title: newTitle };
			}
			return { ...note };
		});

		await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
		console.log(chalk.cyan("Note has been updated!"));
	} else {
		console.log(chalk.bgRed.inverse("Incorrect data!"));
	}
}

async function removeNote(id) {
	const notes = await getNotes();
	const filteredNotes = notes.filter((note) => note.id !== id);

	if (filteredNotes.length !== notes.length) {
		await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
		console.log(chalk.red.bold("Note was removed!"));
	} else {
		console.log(chalk.bgGrey.inverse("Note does not exist with this id!"));
	}
}

async function printNotes() {
	const notes = await getNotes();

	if (!notes.length) {
		console.log(chalk.bgRed.bold("No notes!"));
	} else {
		console.log(chalk.bgGreen.bold("Here is the list of notes:"));

		notes.forEach((note) => {
			console.log(chalk.green(note.id, note.title));
		});
	}
}

module.exports = {
	addNote,
	removeNote,
	getNotes,
	editNote,
};
