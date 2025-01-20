const nojs = document.getElementsByTagName('noscript')[0];
if (nojs) {
    nojs.remove();
}
const fsname = 'Name: Philipp Seerainer';
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
let home = 'Location: Salzburg, Austria';
let contact = 'Contact: ';
let theme = 'Toggle theme';

if (navigator.language === 'de') {
    home = 'Ort: Salzburg, Österreich';
    contact = 'Kontakt: ';
    theme = 'Design wechseln';
}

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme:dark)').matches;
const themeElement = 'theme-element';
const mail = window.atob('cGhpbGlwcEBzZWVyYWluZXIuY29t');
const link = document.createElement('a');
link.className = themeElement;
if (prefersDarkScheme) {
    link.classList.add('dark-theme');
} else {
    link.classList.add('light-theme');
}
link.innerText = mail;
link.href = window.atob('bWFpbHRvOg==') + mail;
const textElement = document.getElementsByTagName('p')[0];
const pgpText = document.getElementsByTagName('details')[0];
pgpText.className = themeElement;
const button = document.getElementsByTagName('button')[0];
button.title = theme;
const image = 'img';
const image1 = document.getElementsByTagName(image)[0];
image1.className = themeElement;
const image2 = document.getElementsByTagName(image)[1];
image2.className = themeElement;
const br = document.createElement('br');
const summary = document.createElement('summary');
summary.className = themeElement;
summary.innerText = 'PGP';
const pre = document.createElement('pre');
pre.className = themeElement;
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

if (button) {
    button.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');

        document.querySelectorAll('.theme-element').forEach(element => {
            element.classList.toggle('dark-theme');
            element.classList.toggle('light-theme');
        });
    });
}

if (pgpText) {
    pgpText.style.display = 'block';
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

document.addEventListener('DOMContentLoaded', () => {
    if (prefersDarkScheme) {
        document.body.classList.add('dark-theme');
        document.querySelectorAll('.theme-element').forEach(element => {
            element.classList.add('dark-theme');
        });
    } else {
        document.body.classList.add('light-theme');
        document.querySelectorAll('.theme-element').forEach(element => {
            element.classList.add('light-theme');
        });
    }
});

showText();
