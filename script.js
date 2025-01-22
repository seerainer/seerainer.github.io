document.addEventListener('DOMContentLoaded', () => {
    const nojs = document.querySelector('noscript');
    if (nojs) nojs.remove();
    
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
    const langDE = navigator.language === 'de';    
    const home = langDE ? 'Ort: Salzburg, Österreich' : 'Location: Salzburg, Austria';
    const contact = langDE ? 'Kontakt: ' : 'Contact: ';
    const theme = langDE ? 'Design wechseln' : 'Toggle theme';
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkTheme = 'dark-theme';
    const lightTheme = 'light-theme';
    const themeElement = 'theme-element';
    const mail = window.atob('cGhpbGlwcEBzZWVyYWluZXIuY29t');
    const link = document.createElement('a');
    link.className = themeElement;
    link.classList.add(prefersDarkScheme ? darkTheme : lightTheme);
    link.innerText = mail;
    link.href = window.atob('bWFpbHRvOg==') + mail;

    const textElement = document.querySelector('p');
    const pgpText = document.querySelector('details');
    const button = document.querySelector('button');
    const images = document.querySelectorAll('img');
    const summary = document.createElement('summary');
    summary.className = themeElement;
    summary.innerText = 'PGP';
    const pre = document.createElement('pre');
    pre.className = themeElement;
    pre.innerText = pgpKey;

    [pgpText, ...images].forEach(el => el.className = themeElement);
    pgpText.classList.add(prefersDarkScheme ? darkTheme : lightTheme);
    button.innerText = '\uD83D\uDD06';
    button.title = theme;

    button.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        document.body.classList.toggle(lightTheme);
        document.querySelectorAll('.theme-element').forEach(el => {
            el.classList.toggle(darkTheme);
            el.classList.toggle(lightTheme);
        });
    });

    pgpText.style.display = 'block';
    pgpText.append(summary, pre);
    pgpText.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNodeContents(pre);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });

    const policy = window.trustedTypes ? trustedTypes.createPolicy('default', {
        createHTML: (string) => string
    }) : null;

    let index = 0;
    function showText() {
        if (index < fsname.length) {
            textElement.innerHTML += policy ? policy.createHTML(fsname.charAt(index)) : fsname.charAt(index);
        } else if (index < fsname.length + home.length) {
            textElement.innerHTML += policy ? policy.createHTML(home.charAt(index - fsname.length)) : home.charAt(index - fsname.length);
        } else if (index < fsname.length + home.length + contact.length) {
            textElement.innerHTML += policy ? policy.createHTML(contact.charAt(index - fsname.length - home.length)) : contact.charAt(index - fsname.length - home.length);
        } else if (index === fsname.length + home.length + contact.length) {
            textElement.append(link);
        }
        if (index === fsname.length - 1 || index === fsname.length + home.length - 1) {
            textElement.appendChild(document.createElement('br'));
        }
        index++;
        setTimeout(showText, 34);
    }

    document.querySelector('html').lang = langDE ? 'de' : 'en';
    document.body.classList.add(prefersDarkScheme ? darkTheme : lightTheme);
    document.querySelectorAll('.theme-element').forEach(el => {
        el.classList.add(prefersDarkScheme ? darkTheme : lightTheme);
    });

    showText();
});