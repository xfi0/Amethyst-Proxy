function searchHeaders() {
    document.getElementById('searchbar').addEventListener('input', searchHeaders);
    const query = document.getElementById('uv-address').value.toLowerCase();
    const headers = document.querySelectorAll('h4,.icon');
    headers.forEach(header => {
        const text = header.textContent.toLowerCase();
        if (query) {
            if (text.includes(query)) {
                header.removeAttribute("hidden");
            } else {
                header.setAttribute("hidden", true);
            }
        } else {
            // When the query is empty, show all headers and remove any highlighting
            header.removeAttribute("hidden");
        }
    });
}
document.addEventListener("DOMContentLoaded", function() {
	const splashTexts = [
	"https://github.com/xfi0/",
 	"made by dominic the worst coder",
 	"thanks for using my site",
  	"i <3 VsCode",
	"amethyst removes internet censorship",
	"recomend me to your friends",
	"unlock blocked content with amethyst"
	];

	const splashParagraph = document.querySelector('.splash');

	function changeSplashText() {
		const randomIndex = Math.floor(Math.random() * splashTexts.length);
		splashParagraph.textContent = splashTexts[randomIndex];
	}

	// Initial text set
	changeSplashText();

	// Change text on click
	splashParagraph.addEventListener('click', changeSplashText);
});
"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");
const connection = new BareMux.BareMuxConnection("/baremux/worker.js")

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	try {
		await registerSW();
	} catch (err) {
		error.textContent = "Failed to register service worker.";
		errorCode.textContent = err.toString();
		throw err;
	}

	const url = search(address.value, searchEngine.value);

	let frame = document.getElementById("uv-frame");
	frame.style.display = "block";
	let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
	if (await connection.getTransport() !== "/epoxy/index.mjs") {
		await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
	}
	frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
});
