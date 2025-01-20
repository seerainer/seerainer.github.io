const nojs = document.getElementsByTagName("noscript")[0];
nojs.remove();
const fsname = "Name: Philipp Seerainer";
let home = "Location: Salzburg, Austria";
let contact = "Contact: ";

if (navigator.language === "de") {
    home = "Ort: Salzburg, Österreich";
    contact = "Kontakt: ";
}

const mail = window.atob("cGhpbGlwcEBzZWVyYWluZXIuY29t");
const link = document.createElement("a");
link.innerText = mail;
link.href = window.atob("bWFpbHRvOg==") + mail;
const textElement = document.getElementsByTagName("p")[0];
const br = document.createElement("br");
let index = 0;

function showText() {
    if (textElement) {
        if (index < fsname.length) {
            textElement.innerHTML += fsname.charAt(index);
        } else if (index < fsname.length + home.length) {
            textElement.innerHTML += home.charAt(index - fsname.length);
        } else if (index < fsname.length + home.length + contact.length) {
            textElement.innerHTML += contact.charAt(index - fsname.length - home.length);
        } else if (index === fsname.length + home.length + contact.length) {
            textElement.appendChild(link);
        }

        if (index === fsname.length - 1) {
            textElement.appendChild(br);
        }
        if (index === fsname.length + home.length - 1) {
            textElement.appendChild(br);
        }

        index++;
        setTimeout(showText, 34);
    }
}

const pgpText = document.getElementsByTagName("details")[0];
if (pgpText) {
    pgpText.style.display = "block";
    pgpText.onclick = () => {
        const pre = document.getElementsByTagName("pre")[0];
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
    };
}

showText();
