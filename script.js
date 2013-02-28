// Syntax Highlight
SyntaxHighlighter.highlight({}, document.getElementById("source"));

// Hash event
function onHashChange() {
	Array.prototype.forEach.call(document.querySelectorAll(".highlighted"), function (element) {
		element.classList.remove("highlighted");
	});

	location.hash.replace(/L(\d+)-*(\d*)/, function (match, line, max, line_node) {
		line = parseInt(line, 10) || 1;
		max = parseInt(max, 10) || line;

		if (document.querySelector(".code .number"+line)) {
			for (; line <= max; ++line) {
				document.querySelector(".code .number"+line).classList.add("highlighted");
			}
		}
	});
}

// Click event
function onClick(event) {
	var
	line = event.target.parentNode && event.target.parentNode.className == "gutter" && event.target.firstChild.nodeValue || 0,
	keep = event.shiftKey && onClick.line;

	if (line) {
		event.preventDefault();

		location.hash = "L" + (keep ? Math.min(onClick.line, line)+"-"+Math.max(onClick.line, line) : line);

		onClick.line = keep ? onClick.line : line;
	}
}
onClick.line = 0;

window.addEventListener("click", onClick);
window.addEventListener("hashchange", onHashChange);
window.addEventListener("DOMContentLoaded", onHashChange);
window.addEventListener("DOMContentLoaded", function () {
	location.hash.replace(/L(\d+)/, function (match, line) {
		if (document.querySelector(".code .number"+line)) {
			document.querySelector(".gutter .number"+Math.max(line - 10, 1)).scrollIntoView(true);
		}
	});
});