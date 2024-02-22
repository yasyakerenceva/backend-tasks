document.addEventListener("click", (e) => {
	const { target } = e;

	if (target.dataset.type === "remove") {
		const id = target.dataset.id;

		remove(id).then(() => {
			target.closest("li").remove();
		});
	}

	if (target.dataset.type === "edit") {
		const id = target.dataset.id;
		const newTitle = prompt("Введите новое название");

		if (newTitle) {
			update(id, newTitle).then(() => {
				target.closest("li").children[0].textContent = newTitle;
			});
		}
	}
});

async function remove(id) {
	await fetch(`/${id}`, {
		method: "DELETE",
	});
}

async function update(id, newTitle) {
	await fetch(`/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json;charset=utf-8" },
		body: JSON.stringify({
			id,
			title: newTitle,
		}),
	});
}
