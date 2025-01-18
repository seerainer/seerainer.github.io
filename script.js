const pgp = document.getElementsByName("details")[0];
if (pgp) {
    pgp.style.display = "block";
    pgp.onclick = () => {
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
const home = document.createElement("p");
home.innerText = "Location: Salzburg, Austria";
const br = document.createElement("br");
const text = [fsname, contact, home, br];
const textField = document.getElementsByName("p")[0];
if (textField) {
    let index = 0;

    function showText() {
        textField.appendChild(text[index]);
        textField.innerHTML += text.charAt(index);
        index++;
        setTimeout(showText, 100);
    }

    showText();
}