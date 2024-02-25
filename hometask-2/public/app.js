document.addEventListener("click", (e) => {
	const { target } = e;

	if (target.dataset.type === "remove") {
		const id = target.dataset.id;

		remove(id).then(() => {
			target.closest("li").remove();
		});
	}

	if (target.dataset.type === "update") {
		const [contentChild, updateChild] = target.closest("li").children;
		hideAndShowElements(contentChild, updateChild);
	}

	if (target.dataset.type === "cancel") {
		const [contentChild, updateChild] = target.closest("li").children;
		const [inputChild] = updateChild.children;

		hideAndShowElements(updateChild, contentChild);
		inputChild.value = inputChild.dataset.value;
	}

	if (target.dataset.type === "save") {
		const [contentChild, updateChild] = target.closest("li").children;
		const [inputChild] = updateChild.children;

		const { value, dataset } = inputChild;

		if (value !== dataset.value && value) {
			const id = target.dataset.id;
			update(id, value).then(() => {
				contentChild.children[0].textContent = value;
			});
		}

		if (value) {
			hideAndShowElements(updateChild, contentChild);
		} else {
			inputChild.focus();
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

function hideAndShowElements(hiddenElement, openElement) {
	hiddenElement.classList.add("d-none");
	openElement.classList.remove("d-none");
}
