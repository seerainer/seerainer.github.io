const nojs = document.getElementsByTagName("noscript")[0];
nojs.remove();
const fsname = "Name: Philipp Seerainer";
const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEYrzIqxYJKwYBBAHaRw8BAQdA7IsFT4l1unJVRExP6eqTy2rJ4HxIL4Zwba8r
eb2hTfG0KVBoaWxpcHAgU2VlcmFpbmVyIDxwaGlsaXBwQHNlZXJhaW5lci5jb20+
iJMEExYKADsWIQSE+vhVj6RICLFOnLCuID1NlOIobQUCYrzIqwIbIwULCQgHAgIi
AgYVCgkICwIEFgIDAQIeBwIXgAAKCRCuID1NlOIobSzeAP9UebF7rBPa+k/1TjZa
/7mshIQTRfBzRqT8nvvYBHq84QD/RnH5cJDvsXKM0KV0jWOcqmELm1ImBGq8Nbl2
MFn5DQ64OARivMirEgorBgEEAZdVAQUBAQdAX7XQ10VBNLh7MW4m9TrLSTm/wqui
YkJAboaiI/m4nRQDAQgHiHgEGBYKACAWIQSE+vhVj6RICLFOnLCuID1NlOIobQUC
YrzIqwIbDAAKCRCuID1NlOIobe0kAP9BmLHOxHtfFyCJO0d+/jv9rT2gCtqycZct
phva83NCYwEA1XIo3tBp2RL5JKm31GWpSC8HvS2TY42LhqmDm+GJUQc=
=Z83F
-----END PGP PUBLIC KEY BLOCK-----`;
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
const pgpText = document.getElementsByTagName("details")[0];
const br = document.createElement("br");
const summary = document.createElement("summary");
summary.innerText = "PGP";
const pre = document.createElement("pre");
pre.innerText = pgpKey;
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

if (pgpText) {
    pgpText.style.display = "block";
    pgpText.appendChild(summary);
    pgpText.appendChild(pre);
    pgpText.onclick = () => {
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
