const m = window.atob("cGhpbGlwcEBzZWVyYWluZXIuY29t");
const e = document.createElement("a");
const p = document.getElementById("mail");
e.innerText = m;
e.href = window.atob("bWFpbHRvOg==") + m;
p.replaceChild(e, p.children[0]);
