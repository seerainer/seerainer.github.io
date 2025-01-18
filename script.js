const d = document.querySelector("details");
if (d) {
    d.style.display = "block";
    d.onclick = () => {
        const n = document.querySelector("pre");
        if (n) {
            if (document.body.createTextRange) {
                const r = document.body.createTextRange();
                r.moveToElementText(n);
                r.select();
            } else if (window.getSelection) {
                const s = window.getSelection();
                const r = document.createRange();
                r.selectNodeContents(n);
                s.removeAllRanges();
                s.addRange(r);
            }
        }
    }
}

const m = window.atob("cGhpbGlwcEBzZWVyYWluZXIuY29t");
const e = document.createElement("a");
e.innerText = m;
e.href = window.atob("bWFpbHRvOg==") + m;
const p = document.querySelector("p");
if (p) {
    const t = "<p>Name: Philipp Seerainer</p>\n<p>Contact: " + e + "</p>\n<p>Location: Salzburg, Austria</p>";
    let index = 0;

    function showText() {
        if (index < t.length) {
            p.innerHTML += t.charAt(index);
            index++;
            setTimeout(showText, 100);
        }
    }

    showText();
}