const details = document.querySelector("details");
if (details) {
    details.style.display = "block";
    details.onclick = () => {
        const pre = document.querySelector("pre");
        if (pre) {
            if (document.body.createTextRange) {
                const r = document.body.createTextRange();
                r.moveToElementText(pre);
                r.select();
            } else if (window.getSelection) {
                const s = window.getSelection();
                const r = document.createRange();
                r.selectNodeContents(pre);
                s.removeAllRanges();
                s.addRange(r);
            }
        }
    }
}

const mail = window.atob("cGhpbGlwcEBzZWVyYWluZXIuY29t");
const link = document.createElement("a");
link.innerText = mail;
link.href = window.atob("bWFpbHRvOg==") + mail;
const fsname = document.createElement("p");
fsname.innerText = "Name: Philipp Seerainer";
const contact = document.createElement("p");
contact.innerText = "Contact: ${link}";
const location = document.createElement("p");
location.innerText = "Location: Salzburg, Austria";
const br = document.createElement("br");
const text = fsname + contact + location + br;
const div = document.querySelector("div");
if (div) {
    let index = 0;

    function showText() {
        if (index < text.length) {
            div.innerHTML += text.charAt(index);
            index++;
            setTimeout(showText, 100);
        }
    }

    showText();
}