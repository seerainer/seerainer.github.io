const details = document.getElementsByName("details")[0];
if (details) {
    details.style.display = "block";
    details.onclick = () => {
        const pre = document.getElementsByTagName("pre")[0];
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
contact.innerText = "Contact: ";
contact.appendChild(link);
const location = document.createElement("p");
location.innerText = "Location: Salzburg, Austria";
const br = document.createElement("br");
const text = [fsname, contact, location, br];
const p = document.getElementById("text");
if (p) {
    let index = 0;

    function showText() {
        p.appendChild(text[index]);
        p.innerHTML += text.charAt(index);
        index++;
        setTimeout(showText, 100);
    }

    showText();
}