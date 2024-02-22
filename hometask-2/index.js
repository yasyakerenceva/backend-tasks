const express = require("express");
const chalk = require("chalk");
const path = require("path");
const {
	addNote,
	getNotes,
	editNote,
	removeNote,
} = require("../hometask-1/notes.controller");

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "hometask-2/pages");

app.use(express.static(path.resolve(__dirname, "public")));

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

app.get("/", async (req, res) => {
	res.render("index", {
		title: "Express App",
		notes: await getNotes(),
		created: false,
	});
});

app.post("/", async (req, res) => {
	await addNote(req.body.title);
	res.render("index", {
		title: "Express App",
		notes: await getNotes(),
		created: true,
	});
});

app.put("/:id", async (req, res) => {
	const { id, title } = req.body;
	await editNote(id, title);

	res.render("index", {
		title: "Express App",
		notes: await getNotes(),
		created: false,
	});
});

app.delete("/:id", async (req, res) => {
	await removeNote(req.params.id);

	res.render("index", {
		title: "Express App",
		notes: await getNotes(),
		created: false,
	});
});

app.listen(PORT, () => {
	console.log(chalk.green(`Server has been started on port ${PORT}...`));
});
