function searchHeaders() {
    document.getElementById('uv-address').addEventListener('input', searchHeaders);
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