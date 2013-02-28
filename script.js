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

// Assign pointer events
function onPointerStart(event) {
	onPointerMove(event);

	window.addEventListener("mousemove", onPointerMove);
	window.addEventListener("touchmove", onPointerMove);
	window.addEventListener("mouseup", onPointerEnd);
	window.addEventListener("touchend", onPointerEnd);
}

function onPointerMove(event) {
	var
	node = document.elementFromPoint(event.clientX || (event.pageX - window.pageXOffset), event.clientY || (event.pageY - window.pageYOffset)),
	line = node && node.parentNode && node.parentNode.className == "gutter" && node.firstChild.nodeValue || 0,
	keep = (event.shiftKey || /move/.test(event.type)) && onPointerMove.line;

	if (line && line != onPointerMove.line) {
		event.preventDefault();

		location.hash = "L" + (keep ? Math.min(onPointerMove.line, line)+"-"+Math.max(onPointerMove.line, line) : line);

		onPointerMove.line = keep ? onPointerMove.line : line;
	}
}
onPointerMove.line = 0;

function onPointerEnd(event) {
	window.removeEventListener("mousemove", onPointerMove);
	window.removeEventListener("touchmove", onPointerMove);
	window.removeEventListener("mouseup", onPointerEnd);
	window.removeEventListener("touchend", onPointerEnd);
}

// Initialize all events
window.addEventListener("mousedown", onPointerStart);
window.addEventListener("touchstart", onPointerStart);
window.addEventListener("hashchange", onHashChange);
window.addEventListener("DOMContentLoaded", onHashChange);
window.addEventListener("DOMContentLoaded", function () {
	location.hash.replace(/L(\d+)/, function (match, line) {
		if (document.querySelector(".code .number"+line)) {
			document.querySelector(".gutter .number"+Math.max(line - 10, 1)).scrollIntoView(true);
		}
	});
});