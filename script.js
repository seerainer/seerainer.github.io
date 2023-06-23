const d = document.getElementsByTagName("details")[0];
const m = window.atob("cGhpbGlwcEBzZWVyYWluZXIuY29t");
const e = document.createElement("a");
const p = document.getElementsByTagName("p")[0];
d.style.display = "block";
e.innerText = m;
e.href = window.atob("bWFpbHRvOg==") + m;
p.replaceChild(e, p.children[0]);
d.onclick = () => {
    const n = document.getElementsByTagName("pre")[0];

    if (document.body.createTextRange) {
        const r = document.body.createTextRange();
        r.moveToElementText(n);
        r.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const r = document.createRange();
        r.selectNodeContents(n);
        selection.removeAllRanges();
        selection.addRange(r);
    }
}
